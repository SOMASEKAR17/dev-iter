"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import {  Github, Linkedin } from "lucide-react"


interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  gallery: string[]
  techstack: Record<string, string>
  link: string | {
    linkedIn?: string
    Github?: string
  }
}



export default function ProjectDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  const getLinks = (link: Project["link"]) => {
    if (typeof link === "string") {
      return { github: link, linkedin: null }
    }

    return {
      github: link?.Github || null,
      linkedin: link?.linkedIn || null,
    }
  }


  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/projects`)
      const data = await res.json()
      setProject(data.filter((e: Project) => e.id == id)[0])
    }

    fetchProject()
  }, [id])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">

      {/* BLUR LOOP BACKGROUND */}
      

      {/* 🧊 GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          relative h-[80vh] scroll-bar overflow-y-scroll
          w-full max-w-5xl rounded-2xl
          bg-black/30 backdrop-blur-3xl
          border border-white/10 shadow-2xl
          p-8 text-white
        "
      >
        {/* Close */}
        <button
          onClick={() => {
            router.push("/projects")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}

          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
        >
          <X size={18} />
        </button>

        {/* Title + Links */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{project.title}</h1>

          {(() => {
            const { github, linkedin } = getLinks(project.link)

            return (
              <div className="flex mt-10 items-center gap-3">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                  >
                    <Github size={16} />
                  </a>
                )}

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            )
          })()}
        </div>


        <p className="mt-2 text-sm text-gray-400">
          {new Date(project.createdAt).toDateString()}
        </p>

        {/* Description */}
        <p className="mt-6 text-gray-300 leading-relaxed">
          {project.description}
        </p>

        {/* 🔥 TECH STACK */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Tech Stack
          </h3>

          <div className="flex flex-wrap gap-3">
            {Object.entries(project.techstack).map(([name, logo]) => (
              <div
                key={name}
                className="
                  flex items-center gap-2
                  rounded-full
                  bg-white/10
                  px-3 py-1
                  text-xs text-gray-200
                  backdrop-blur
                  hover:bg-white/20
                  transition
                "
              >
                <img src={logo} alt={name} className="h-4 w-4 object-contain" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {project.gallery.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-white/10">
              <img src={img} alt="project" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
