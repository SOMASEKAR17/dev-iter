"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { app } from "@/firebase"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash, Save, Loader2, X } from "lucide-react"
import toast from "react-hot-toast"

const auth = getAuth(app)
const ALLOWED_EMAIL = "somasekarnaidu79@gmail.com"

interface SkillItem {
  link: string;
  text: string;
  image: string;
}

type SkillsState = Record<string, SkillItem[]>;

export default function AdminSkillsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [skills, setSkills] = useState<SkillsState | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== ALLOWED_EMAIL) {
        router.replace("/admin/login")
        return
      }
      setUser(currentUser)
      fetchSkills()
    })
    return () => unsubscribe()
  }, [router])

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills")
      const data = await res.json()
      setSkills(data)
    } finally {
      setLoading(false)
    }
  }

  const handleCloudinaryUpload = (category: string, index: number) => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_upload",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          updateSkill(category, index, "image", result.info.secure_url);
        }
      }
    );
    widget.open();
  }

  const updateSkill = (category: string, index: number, field: keyof SkillItem, value: string) => {
    if (!skills) return
    const updated = { ...skills }
    updated[category][index] = { ...updated[category][index], [field]: value }
    setSkills(updated)
  }

  const removeSkill = (category: string, index: number) => {
    if (!skills) return
    const updated = { ...skills }
    updated[category] = updated[category].filter((_, i) => i !== index)
    setSkills(updated)
  }

  const addSkill = (category: string) => {
    if (!skills) return
    const updated = { ...skills }
    updated[category] = [...updated[category], { link: "#", text: "New Skill", image: "" }]
    setSkills(updated)
  }

  const addCategory = () => {
    if (!newCategoryName.trim()) return
    const id = newCategoryName.toLowerCase().replace(/\s+/g, '')
    if (skills && skills[id]) {
      toast.error("Category already exists")
      return
    }
    setSkills({ ...skills, [id]: [] })
    setNewCategoryName("")
    setShowAddCategory(false)
    toast.success(`Category "${newCategoryName}" added!`)
  }

  const removeCategory = (category: string) => {
    if (!confirm(`Are you sure you want to delete the "${category}" category?`)) return
    const updated = { ...skills }
    delete updated[category]
    setSkills(updated)
    toast.success("Category removed locally. Save to apply.")
  }

  const saveCategory = async (category: string) => {
    if (!skills) return
    setSaving(category)
    try {
      const res = await fetch("/api/skills", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, items: skills[category] }),
      })
      if (res.ok) {
        toast.success(`${category} saved successfully!`)
      } else {
        toast.error("Failed to save")
      }
    } catch (err) {
      console.error(err)
      toast.error("An error occurred while saving")
    } finally {
      setSaving(null)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-white" size={32} />
    </div>
  )
  
  if (!skills) return null

  return (
    <div className="min-h-screen p-8 pt-20 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Skills</h1>
          <button 
            onClick={() => setShowAddCategory(true)}
            className="flex items-center gap-2 bg-zinc-800 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-700 transition"
          >
            <Plus size={18} />
            New Category
          </button>
        </div>

        <div className="space-y-12 pb-20">
          {Object.entries(skills).map(([category, items]) => (
            <section key={category} className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6 backdrop-blur-sm relative group/section">
              <button 
                onClick={() => removeCategory(category)}
                className="absolute top-6 right-40 p-2 text-white/20 hover:text-red-500 opacity-0 group-hover/section:opacity-100 transition"
                title="Delete Category"
              >
                <Trash size={16} />
              </button>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                <button 
                  onClick={() => saveCategory(category)}
                  disabled={!!saving}
                  className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
                >
                  {saving === category ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item: any, i: number) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 group hover:border-white/20 transition">
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Name</label>
                        <input 
                          value={item.text}
                          onChange={(e) => updateSkill(category, i, "text", e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Icon URL</label>
                        <input 
                          value={item.image}
                          onChange={(e) => updateSkill(category, i, "image", e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs outline-none focus:border-white/30"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {item.image && <img src={item.image} className="w-8 h-8 object-contain opacity-50 transition hover:opacity-100" alt="" />}
                          <button 
                            onClick={() => handleCloudinaryUpload(category, i)}
                            className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition"
                          >
                            Upload
                          </button>
                        </div>
                        <button 
                          onClick={() => removeSkill(category, i)}
                          className="p-2 text-red-500/50 hover:text-red-500 transition"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => addSkill(category)}
                  className="border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/5 transition group min-h-[140px]"
                >
                  <Plus size={24} className="text-white/20 group-hover:text-white/50 mb-2" />
                  <span className="text-xs text-white/20 group-hover:text-white/50">Add Skill</span>
                </button>
              </div>
            </section>
          ))}
        </div>
      </motion.div>

      {/* Add Category Modal */}
      <AnimatePresence>
        {showAddCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">New Skill Category</h3>
                <button onClick={() => setShowAddCategory(false)} className="text-gray-500 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Category Name</label>
                  <input 
                    autoFocus
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Databases, Tools, DevOps"
                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition"
                    onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                  />
                  <p className="text-[10px] text-gray-600 mt-2 italic">A new section will be created instantly.</p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setShowAddCategory(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition font-bold text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={addCategory}
                    className="flex-1 px-4 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition font-bold text-sm"
                  >
                    Create
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
