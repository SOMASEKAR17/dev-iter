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
    { id: "1", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238817/Screenshot_2026-01-12_224004_pftirp.png", url: "#", height: 420 },
    { id: "2", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_201642_sej9ra.png", url: "#", height: 300 },
    { id: "3", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238814/Screenshot_2026-01-12_220813_bv3axm.png", url: "#", height: 520 },
    { id: "4", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238810/Screenshot_2026-01-12_203637_qj96vy.png", url: "#", height: 300 },
    { id: "5", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_203235_kfkhnk.png", url: "#", height: 350 },
    { id: "6", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_222702_ck1dki.png", url: "#", height: 400 },
    { id: "7", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238810/Screenshot_2026-01-12_200817_sefjvo.png", url: "#", height: 380 },
    { id: "8", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238819/Screenshot_2026-01-12_200557_knuk0n.png", url: "#", height: 470 },
    { id: "9", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238807/Screenshot_2026-01-12_223816_mcvnwq.png", url: "#", height: 300 },
    { id: "10", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238819/Screenshot_2026-01-12_224045_dpkwvc.png", url: "#", height: 450 },
    { id: "11", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238813/Screenshot_2026-01-12_223353_yszttn.png", url: "#", height: 550 },
    { id: "12", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_202957_fhkl97.png", url: "#", height: 400 },
    { id: "13", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238815/Screenshot_2026-01-12_220920_agcsdh.png", url: "#", height: 500 },
    { id: "14", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238802/Screenshot_2026-01-12_222729_g2gdme.png", url: "#", height: 420 },
    { id: "15", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238817/Screenshot_2026-01-12_203806_hipfpw.png", url: "#", height: 360 },
    { id: "16", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_200937_vlaaiu.png", url: "#", height: 520 },
    { id: "17", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238820/Screenshot_2026-01-12_200610_lknc8a.png", url: "#", height: 440 },
    { id: "18", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_223848_df2qyq.png", url: "#", height: 550 },
    { id: "19", img: "hhttps://res.cloudinary.com/di97k34d0/image/upload/v1768238804/Screenshot_2026-01-12_222800_qtswov.png", url: "#", height: 350 },
    { id: "20", img: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238818/Screenshot_2026-01-12_224016_f8aur8.png", url: "#", height: 480 },
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
