"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Masonry from "@/components/reactBites/masonry"
import { usePathname } from "next/navigation"
import SliderRow from "@/components/custom/SliderWindow"

interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  gallery: string[]

  techstack: {
    [techName: string]: string   
  }
}


export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060818] text-white">
        Loading projects...
      </div>
    )
  }

  


  /* ---------------- MASONRY BACKGROUND ITEMS ---------------- */
  const items = [
    { id: "1", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800", url: "#", height: 420 },
    { id: "2", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800", url: "#", height: 300 },
    { id: "3", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800", url: "#", height: 520 },
    { id: "4", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800", url: "#", height: 300 },
    { id: "5", img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=800", url: "#", height: 350 },
    { id: "6", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800", url: "#", height: 400 },
    { id: "7", img: "https://images.unsplash.com/photo-1581091215367-59ab6b3c8f44?q=80&w=800", url: "#", height: 380 },
    { id: "8", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", url: "#", height: 470 },
    { id: "9", img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800", url: "#", height: 300 },
    { id: "10", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800", url: "#", height: 450 },
    { id: "11", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800", url: "#", height: 550 },
    { id: "12", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800", url: "#", height: 400 },
    { id: "13", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800", url: "#", height: 500 },
    { id: "14", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800", url: "#", height: 420 },
    { id: "15", img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=800", url: "#", height: 360 },
    { id: "16", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800", url: "#", height: 520 },
    { id: "17", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", url: "#", height: 440 },
    { id: "18", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800", url: "#", height: 550 },
    { id: "19", img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800", url: "#", height: 350 },
    { id: "20", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800", url: "#", height: 480 },
  ]

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* ---------------- MASONRY BACKGROUND ---------------- */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-full max-w-400 opacity-25">
          <Masonry items={items} duration={0.4} />
        </div>
      </div>

      {/* ---------------- DARK FADE ---------------- */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#060818]/50 to-[#060818]" />

      {/* ---------------- CONTENT ---------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-30">
        <motion.h1
          key={pathname}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay:0.25
          }}
          className="font-exorts text-[20vw] font-bold"
        >
          Projects
        </motion.h1>
        <p className="mt-4 text-gray-400 max-w-2xl">
          A selection of projects I've worked on, focusing on performance,
          scalability, and clean design.
        </p>

        {/* ---------------- PROJECT CARDS ---------------- */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onClick={() => router.push(`/projects/${project.id}`)}
            className="
              cursor-pointer
              rounded-2xl
              bg-white/10 backdrop-blur-md
              p-6
              hover:bg-white/20
              transition
            "
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <span className="text-xs text-gray-400">
                {new Date(project.createdAt).toDateString()}
              </span>
            </div>

            <p className="mt-4 text-gray-300 leading-relaxed">
              {project.description}
            </p>

            {/* 🔽 TECH STACK BADGES */}
            <div className="mt-6 flex flex-wrap gap-3">
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
                  <img
                    src={logo}
                    alt={name}
                    className="h-4 w-4 object-contain"
                  />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      </section>

      <section className="flex gap-4 max-w-400 mx-auto overflow-hidden">
        <SliderRow />
        <SliderRow />
      </section>


        
    </main>
  )
}
