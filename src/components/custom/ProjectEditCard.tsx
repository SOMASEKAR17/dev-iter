"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X, Plus, Trash } from "lucide-react"
import { useLenis } from "lenis/react"

interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  gallery: string[]
  techstack: Record<string, string>
  link: {
    Github?: string
    linkedIn?: string
  }
  order: number
}

export default function ProjectDetailsEditPage({
  id,
  setOpenCard,
}: {
  id: string
  setOpenCard: (i: boolean) => void
}) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [newTechKey, setNewTechKey] = useState("")
  const [newTechValue, setNewTechValue] = useState("")

  // Stop Lenis smooth scroll while modal is open
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) {
      lenis.stop()
    }
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    return () => {
      if (lenis) {
        lenis.start()
      }
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [lenis])

  // Prevent wheel events from reaching Lenis / background
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    const stopWheel = (e: WheelEvent) => {
      e.stopPropagation()
    }
    const stopTouch = (e: TouchEvent) => {
      e.stopPropagation()
    }

    overlay.addEventListener("wheel", stopWheel, { passive: false })
    overlay.addEventListener("touchmove", stopTouch, { passive: false })
    return () => {
      overlay.removeEventListener("wheel", stopWheel)
      overlay.removeEventListener("touchmove", stopTouch)
    }
  }, [project])

  useEffect(() => {
    const fetchProject = async () => {
      if (id.startsWith("new-")) {
        setProject({
          id,
          createdAt: new Date().toISOString().split('T')[0],
          title: "",
          description: "",
          gallery: [],
          techstack: {},
          link: { Github: "", linkedIn: "" },
          order: 0
        })
        return
      }
      const res = await fetch("/api/projects")
      const data = await res.json()
      const found = data.find((e: any) => e.id === id)
      if (found) {
        // Normalize link
        const normalizedLink = typeof found.link === 'string' 
          ? { Github: found.link !== '#' ? found.link : '', linkedIn: '' }
          : { Github: found.link?.Github || '', linkedIn: found.link?.linkedIn || '' };
        setProject({ ...found, link: normalizedLink })
      }
    }
    fetchProject()
  }, [id])

  const updateGallery = (index: number, value: string) => {
    if (!project) return
    const newGallery = [...project.gallery]
    newGallery[index] = value
    setProject({ ...project, gallery: newGallery })
  }

  const removeImage = (index: number) => {
    if (!project) return
    setProject({
      ...project,
      gallery: project.gallery.filter((_, i) => i !== index),
    })
  }

  const addImage = () => {
    if (!project) return
    setProject({ ...project, gallery: [...project.gallery, ""] })
  }

  const updateTechstack = (key: string, value: string) => {
    if (!project) return
    setProject({
      ...project,
      techstack: { ...project.techstack, [key]: value },
    })
  }

  const removeTechItem = (key: string) => {
    if (!project) return
    const updated = { ...project.techstack }
    delete updated[key]
    setProject({ ...project, techstack: updated })
  }

  const addTechItem = () => {
    if (!project || !newTechKey) return
    setProject({
      ...project,
      techstack: { ...project.techstack, [newTechKey]: newTechValue },
    })
    setNewTechKey("")
    setNewTechValue("")
  }

  const handleSave = async () => {
    if (!project) return
    setLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })
      if (res.ok) {
        setOpenCard(false)
        window.location.reload()
      } else {
        alert("Failed to save")
      }
    } catch (err) {
      console.error(err)
      alert("Error saving")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!project) return
    const confirmed = confirm("Are you sure you want to delete this project?")
    if (!confirmed) return

    setLoading(true)
    try {
      const res = await fetch(`/api/projects?id=${project.id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setOpenCard(false)
        window.location.reload()
      } else {
        alert("Failed to delete project")
      }
    } catch (err) {
      console.error(err)
      alert("Error deleting project")
    } finally {
      setLoading(false)
    }
  }

  const handleCloudinaryUpload = () => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_upload",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setProject(prev => prev ? {
            ...prev,
            gallery: [...prev.gallery, result.info.secure_url]
          } : null);
        }
      }
    );
    widget.open();
  }
  if (!project) return null

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm touch-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative h-[85vh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-2xl bg-zinc-900 border border-white/20 p-8 text-white shadow-2xl"
      >
        <button
          onClick={() => setOpenCard(false)}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
        >
          <X size={18} />
        </button>

        <h1 className="text-3xl font-bold mb-6">{id.startsWith('new-') ? 'Add Project' : 'Edit Project'}</h1>

        <div className="space-y-8">
          <section>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Project Details</label>
            <div className="grid gap-4">
              <input
                value={project.title}
                onChange={(e) => setProject(prev => prev ? { ...prev, title: e.target.value } : null)}
                placeholder="Project Title"
                className="w-full rounded-lg bg-white/5 border border-white/10 p-3 outline-none focus:border-white/30 transition"
              />
              <textarea
                value={project.description}
                onChange={(e) => setProject(prev => prev ? { ...prev, description: e.target.value } : null)}
                placeholder="Project Description"
                className="w-full min-h-[120px] rounded-lg bg-white/5 border border-white/10 p-3 outline-none focus:border-white/30 transition shadow-inner"
              />
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-gray-500 uppercase">Priority / Order:</label>
                <input
                  type="number"
                  value={project.order}
                  onChange={(e) => setProject(prev => prev ? { ...prev, order: parseInt(e.target.value) || 0 } : null)}
                  className="w-32 rounded-lg bg-white/5 border border-white/10 p-2 outline-none focus:border-white/30 transition"
                />
                <span className="text-[10px] text-gray-500">(Lower number shows first)</span>
              </div>
            </div>
          </section>

          <section>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Links</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="GitHub URL"
                value={project.link.Github || ""}
                onChange={(e) => setProject(prev => prev ? { ...prev, link: { ...prev.link, Github: e.target.value } } : null)}
                className="rounded-lg bg-white/5 border border-white/10 p-3 outline-none focus:border-white/30 transition"
              />
              <input
                placeholder="LinkedIn URL"
                value={project.link.linkedIn || ""}
                onChange={(e) => setProject(prev => prev ? { ...prev, link: { ...prev.link, linkedIn: e.target.value } } : null)}
                className="rounded-lg bg-white/5 border border-white/10 p-3 outline-none focus:border-white/30 transition"
              />
            </div>
          </section>

          <section>
            <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Tech Stack</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {Object.entries(project.techstack).map(([key, value]) => (
                <div key={key} className="flex gap-2 items-center bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="flex-1 text-sm font-medium">{key}</span>
                  <input
                    value={value}
                    onChange={(e) => updateTechstack(key, e.target.value)}
                    className="flex-1 bg-black/40 rounded p-1.5 text-xs outline-none border border-white/5"
                  />
                  <button onClick={() => removeTechItem(key)} className="text-red-400 p-1 hover:bg-red-400/10 rounded">
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 bg-white/5 p-4 rounded-xl border border-dashed border-white/20">
              <input
                placeholder="Name"
                value={newTechKey}
                onChange={(e) => setNewTechKey(e.target.value)}
                className="flex-1 rounded-lg bg-black/40 border border-white/10 p-2 text-sm outline-none"
              />
              <input
                placeholder="Icon URL"
                value={newTechValue}
                onChange={(e) => setNewTechValue(e.target.value)}
                className="flex-1 rounded-lg bg-black/40 border border-white/10 p-2 text-sm outline-none"
              />
              <button onClick={addTechItem} className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">Add</button>
            </div>
          </section>

          <section>
            <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Gallery Images</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <div className="flex gap-2">
                    <input
                      value={img}
                      onChange={(e) => updateGallery(i, e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 rounded-lg bg-black/40 border border-white/10 p-2 text-xs outline-none"
                    />
                    <button onClick={() => removeImage(i)} className="p-2 text-red-400 bg-red-400/10 rounded-lg"><Trash size={16} /></button>
                  </div>
                  {img && <img src={img} className="h-40 w-full object-cover rounded-lg border border-white/5" alt="pv" />}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <button 
                onClick={addImage} 
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 px-6 py-4 hover:bg-white/10 transition-all border border-white/10"
              >
                <Plus size={18} /> Add URL
              </button>
              <button 
                onClick={handleCloudinaryUpload} 
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600/20 px-6 py-4 hover:bg-indigo-600/30 transition-all border border-indigo-500/30 text-indigo-300"
              >
                <Plus size={18} /> Upload Image
              </button>
            </div>
          </section>
        </div>

        <div className="mt-12 flex gap-4">
          {!id.startsWith("new-") && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-1/3 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/20 py-5 font-black text-lg hover:bg-red-600/30 transition-all disabled:opacity-50"
            >
              DELETE
            </button>
          )}
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex-1 rounded-2xl bg-white text-black py-5 font-black text-lg hover:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-white/5"
          >
            {loading ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
