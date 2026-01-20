"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X, Plus, Trash } from "lucide-react"

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

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProject(data.find((e: Project) => e.id === id))
    }

    fetchProject()
  }, [id])

  const updateGallery = (index: number, value: string) => {
    if (!project) return
    const updated = [...project.gallery]
    updated[index] = value
    setProject({ ...project, gallery: updated })
  }

  const addImage = () => {
    if (!project) return
    setProject({ ...project, gallery: [...project.gallery, ""] })
  }

  const removeImage = (index: number) => {
    if (!project) return
    setProject({
      ...project,
      gallery: project.gallery.filter((_, i) => i !== index),
    })
  }

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[85vh] w-full max-w-5xl overflow-y-scroll rounded-2xl bg-black/30 backdrop-blur-3xl border border-white/30 p-8 text-white"
      >
        <button
          onClick={() => {
            setOpenCard(false)
          }}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
        >
          <X size={18} />
        </button>

        <h1 className="text-3xl font-bold mb-6">Edit Project</h1> 
        <input
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          placeholder="Project Title"
          className="w-full mb-4 rounded-lg bg-white/10 p-3 outline-none"
        /> 
        <textarea
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          placeholder="Project Description"
          className="w-full min-h-[120px] rounded-lg bg-white/10 p-3 outline-none"
        /> 
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="GitHub URL"
            value={project.link.Github || ""}
            onChange={(e) =>
              setProject({
                ...project,
                link: { ...project.link, Github: e.target.value },
              })
            }
            className="rounded-lg bg-white/10 p-3 outline-none"
          />
          <input
            placeholder="LinkedIn URL"
            value={project.link.linkedIn || ""}
            onChange={(e) =>
              setProject({
                ...project,
                link: { ...project.link, linkedIn: e.target.value },
              })
            }
            className="rounded-lg bg-white/10 p-3 outline-none"
          />
        </div> 
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
            Gallery
          </h3>

          <div className="space-y-6">
            {project.gallery.map((img, i) => (
              <div key={i} className="rounded-xl border border-white/30 bg-white/5 p-4">
                <div className="flex gap-2">
                  <input
                    value={img}
                    onChange={(e) => updateGallery(i, e.target.value)}
                    placeholder="Paste image URL here"
                    className="flex-1 rounded-lg bg-white/10 p-2 outline-none"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="rounded-lg bg-red-500/20 p-2 hover:bg-red-500/30"
                  >
                    <Trash size={16} />
                  </button>
                </div>
 
                {img && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                    <img
                      src={img}
                      alt="preview"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div> 
          <button
            onClick={addImage}
            className="mt-6 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            <Plus size={16} />
            Add Image
          </button>
        </div> 
        <button className="mt-10 w-full rounded-xl bg-white text-black py-3 font-semibold hover:opacity-90">
          Save Changes
        </button>
      </motion.div>
    </div>
  )
}
