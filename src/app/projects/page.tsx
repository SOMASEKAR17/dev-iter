"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

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

  return (
    <main className="min-h-screen bg-[#060818] text-white px-6 py-20">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-gray-400 max-w-2xl">
          A selection of projects I've worked on, focusing on performance,
          scalability, and clean design.
        </p>

        <h1 className="font-zalando text-5xl">
          ZALANDO TEST
        </h1>

        <h2 className="font-exorts text-5xl">
          EXORTS TEST
        </h2>


        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="cursor-pointer rounded-2xl bg-white/5 p-6 hover:bg-white/10 transition"
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
