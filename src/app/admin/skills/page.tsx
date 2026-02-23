"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { app } from "@/firebase"
import { motion } from "framer-motion"
import { Plus, Trash, Save, Loader2 } from "lucide-react"

const auth = getAuth(app)
const ALLOWED_EMAIL = "somasekarnaidu79@gmail.com"

interface SkillItem {
  link: string;
  text: string;
  image: string;
}

interface SkillsState {
  languages: SkillItem[];
  webDev: SkillItem[];
  aiMl: SkillItem[];
}

export default function AdminSkillsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [skills, setSkills] = useState<SkillsState | null>(null)

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

  const handleCloudinaryUpload = (category: keyof SkillsState, index: number) => {
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

  const updateSkill = (category: keyof SkillsState, index: number, field: keyof SkillItem, value: string) => {
    if (!skills) return
    const updated = { ...skills }
    updated[category][index] = { ...updated[category][index], [field]: value }
    setSkills(updated)
  }

  const removeSkill = (category: keyof SkillsState, index: number) => {
    if (!skills) return
    const updated = { ...skills }
    updated[category] = updated[category].filter((_, i) => i !== index)
    setSkills(updated)
  }

  const addSkill = (category: keyof SkillsState) => {
    if (!skills) return
    const updated = { ...skills }
    updated[category] = [...updated[category], { link: "#", text: "New Skill", image: "" }]
    setSkills(updated)
  }

  const saveCategory = async (category: keyof SkillsState) => {
    if (!skills) return
    setSaving(category)
    try {
      const res = await fetch("/api/skills", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, items: skills[category] }),
      })
      if (res.ok) {
        alert(`${category} saved successfully!`)
      }
    } catch (err) {
      console.error(err)
      alert("Failed to save")
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
        <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>

        <div className="space-y-12">
          {(["languages", "webDev", "aiMl"] as const).map((category) => (
            <section key={category} className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold capitalize">
                  {category === 'languages' ? 'Languages' : category === 'webDev' ? 'Web Development' : 'AI / Machine Learning'}
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
                {skills[category].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 group hover:border-white/20 transition">
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Name</label>
                        <input 
                          value={item.text}
                          onChange={(e) => updateSkill(category, i, "text", e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Icon URL</label>
                        <input 
                          value={item.image}
                          onChange={(e) => updateSkill(category, i, "image", e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs outline-none"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <img src={item.image} className="w-8 h-8 object-contain opacity-50" alt="" />
                          <button 
                            onClick={() => handleCloudinaryUpload(category, i)}
                            className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition"
                          >
                            Upload
                          </button>
                        </div>
                        <button 
                          onClick={() => removeSkill(category, i)}
                          className="p-2 text-red-500/50 hover:text-red-500"
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
    </div>
  )
}
