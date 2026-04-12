"use client"

import { useEffect, useRef, useState } from "react"
import {  useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import {  Github, Linkedin } from "lucide-react"
import { useLenis } from "lenis/react"


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



export default function ProjectDetailsPage({id,setOpenCard}:{id:string,setOpenCard:(i :boolean)=>void}) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

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

  // Stop Lenis smooth scroll while modal is open
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) {
      lenis.stop()
    }
    // Also lock native scroll as a fallback
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

  if (!project) return null

  return (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-6"
          onClick={() => {
              router.push("/projects")
              setOpenCard(false)
          }}
        >
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="
            relative h-[80vh] scroll-bar overflow-y-auto overscroll-contain
            w-full max-w-5xl rounded-2xl
            bg-black/30 backdrop-blur-3xl
            border border-white/10 shadow-2xl
            p-8 text-white
            "
        >
            <button
            onClick={() => {
                router.push("/projects")
                setOpenCard(false)
            }}

            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
            >
            <X size={18} />
            </button>

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

            <p className="mt-6 text-gray-300 leading-relaxed">
            {project.description}
            </p>

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

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden border rounded-xl bg-white/10">
                <img src={img} alt="project" className="h-full w-full object-cover" />
                </div>
            ))}
            </div>
        </motion.div>
        </div>
  )
}

