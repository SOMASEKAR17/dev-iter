"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { filter } from "framer-motion/client"

interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  gallery: string[]
}

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/projects`)
      const data = await res.json()
      setProject(data.filter((e: Project)=>e.id==id)[0])
    }

    fetchProject()
  }, [id])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl rounded-2xl bg-[#060818] p-8 text-white"
      >
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
        >
          <X size={18} />
        </button>

        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="mt-2 text-sm text-gray-400">
          {new Date(project.createdAt).toDateString()}
        </p>

        <p className="mt-6 text-gray-300 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {project.gallery.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl bg-white/10"
            >
              <img
                src={img}
                alt="project"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
