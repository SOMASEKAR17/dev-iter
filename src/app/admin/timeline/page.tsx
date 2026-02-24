"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { app } from "@/firebase"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash, Save, Loader2, X, MoveUp, MoveDown } from "lucide-react"
import toast from "react-hot-toast"

const auth = getAuth(app)
const ALLOWED_EMAIL = "somasekarnaidu79@gmail.com"

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  type: string;
  desc: string;
  order: number;
}

export default function AdminTimelinePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [items, setItems] = useState<TimelineItem[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== ALLOWED_EMAIL) {
        router.replace("/admin/login")
        return
      }
      setUser(currentUser)
      fetchTimeline()
    })
    return () => unsubscribe()
  }, [router])

  const fetchTimeline = async () => {
    try {
      const res = await fetch("/api/timeline")
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const updateItem = (index: number, field: keyof TimelineItem, value: any) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  const addItem = () => {
    const newItem: TimelineItem = {
      id: "temp-" + Date.now(),
      date: "New Date",
      title: "New Achievement",
      type: "project",
      desc: "Describe what you did...",
      order: items.length
    }
    setItems([...items, newItem])
  }

  const removeItem = async (index: number) => {
    const item = items[index]
    if (!confirm("Are you sure?")) return

    if (!item.id.startsWith("temp-")) {
      try {
        const res = await fetch(`/api/timeline?id=${item.id}`, { method: "DELETE" })
        if (!res.ok) throw new Error()
      } catch (err) {
        toast.error("Failed to delete from database")
        return
      }
    }

    const updated = items.filter((_, i) => i !== index)
    setItems(updated)
    toast.success("Item removed")
  }

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === items.length - 1) return

    const updated = [...items]
    const otherIndex = direction === 'up' ? index - 1 : index + 1
    const temp = updated[index]
    updated[index] = updated[otherIndex]
    updated[otherIndex] = temp

    // Update orders
    updated.forEach((item, i) => item.order = i)
    setItems(updated)
  }

  const saveAll = async () => {
    setSaving(true)
    try {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const method = item.id.startsWith("temp-") ? "POST" : "PATCH";
        const body = item.id.startsWith("temp-") ? { ...item, id: undefined } : item;
        
        const res = await fetch("/api/timeline", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        
        if (!res.ok) throw new Error();
      }
      toast.success("Timeline updated successfully!")
      fetchTimeline(); // refresh to get real IDs
    } catch (err) {
      console.error(err)
      toast.error("Failed to save some items")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-white" size={32} />
    </div>
  )

  return (
    <div className="min-h-screen p-8 pt-20 bg-black text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Journey Timeline</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your professional milestones and achievements</p>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={addItem}
              className="flex items-center gap-2 bg-zinc-800 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-700 transition"
            >
              <Plus size={18} />
              Add Event
            </button>
            <button 
              onClick={saveAll}
              disabled={saving}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save All Changes
            </button>
          </div>
        </div>

        <div className="space-y-4 max-w-5xl mx-auto pb-20">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 flex gap-6 items-start group hover:border-white/20 transition"
              >
                <div className="flex flex-col gap-2 pt-2">
                  <button onClick={() => moveOrder(index, 'up')} className="p-1 hover:text-white text-gray-600 transition"><MoveUp size={16}/></button>
                  <button onClick={() => moveOrder(index, 'down')} className="p-1 hover:text-white text-gray-600 transition"><MoveDown size={16}/></button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Date</label>
                    <input 
                      value={item.date}
                      onChange={(e) => updateItem(index, "date", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Title / Achievement</label>
                    <input 
                      value={item.title}
                      onChange={(e) => updateItem(index, "title", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm font-semibold outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Type</label>
                    <select 
                      value={item.type}
                      onChange={(e) => updateItem(index, "type", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-white/30 appearance-none capitalize"
                    >
                      <option value="hackathon">Hackathon</option>
                      <option value="internship">Internship</option>
                      <option value="project">Project</option>
                      <option value="club">Club / Community</option>
                    </select>
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Description</label>
                    <textarea 
                      value={item.desc}
                      onChange={(e) => updateItem(index, "desc", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-white/30 min-h-[80px]"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => removeItem(index)}
                  className="p-3 text-gray-600 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {items.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
               <p className="text-gray-500">No timeline events yet.</p>
               <button onClick={addItem} className="mt-4 text-white underline font-bold">Add your first event</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
