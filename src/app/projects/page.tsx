"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Masonry from '@/components/reactBites/masonry';

interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  gallery: string[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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

  /* ---------------- RANDOM TECH BACKGROUND IMAGES ---------------- */
  const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    // ... more items
];

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* ---------------- GALLERY BACKGROUND ---------------- */}
      <div className="absolute inset-0 -z-10 grid grid-cols-3 md:grid-cols-4 gap-2 opacity-20">
        <Masonry
        items={items}
          duration={0.4}
        />
      </div>

      {/* ---------------- DARK FADE ---------------- */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#060818]/40 to-[#060818]" />

      {/* ---------------- CONTENT ---------------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
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
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
