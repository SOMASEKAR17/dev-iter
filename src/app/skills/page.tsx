"use client"

import { useState, useEffect } from "react"
import FlowingMenu from "@/components/reactBites/flowingMenue"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const Page = () => {
  const pathname = usePathname();
  const [skills, setSkills] = useState<{languages: any[], webDev: any[], aiMl: any[]}>({
    languages: [],
    webDev: [],
    aiMl: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/skills")
      .then(res => res.json())
      .then(data => {
        setSkills(data)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-xl font-bold animate-pulse">Loading Skills...</div>
    </div>
  )

  const languagesItems = skills.languages
  const webDevItems = skills.webDev
  const aiMlItems = skills.aiMl

  return (
    <div className="min-h-screen pt-30 pb-20 px-6 bg-black">
      <div className="grid-cols-1 grid md:grid-cols-2 mx-auto relative gap-10 max-w-350">
        
        <section className="relative border border-white/10 rounded-4xl bg-zinc-900/20 backdrop-blur-sm">
          <motion.h1
            key={pathname + "lang"}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[15vw] sm:text-[8vw] text-center font-exorts text-white lg:-mb-10"
          >
            Languages
          </motion.h1>
          <div className="h-[80vw] sm:h-[60vw] md:h-[47vw] lg:h-[40vw] xl:h-[35vw] relative">
            <FlowingMenu marqueeTextColor={"#aaaeb5"} marqueeBgColor={"#393e47"} items={languagesItems} />
          </div>
        </section>

        <section className="relative border border-white/10 rounded-4xl bg-zinc-900/20 backdrop-blur-sm">
          <motion.h1
            key={pathname + "web"}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-[15vw] sm:text-[8vw] text-center font-exorts text-white lg:-mb-10"
          >
            Web Development
          </motion.h1>
          <div className="h-[90vw] sm:h-[65vw] md:h-[47vw] lg:h-[40vw] xl:h-[35vw] relative">
            <FlowingMenu marqueeTextColor={"#aaaeb5"} marqueeBgColor={"#393e47"} items={webDevItems} />
          </div>
        </section>

        <section className="relative overflow-hidden border border-white/10 rounded-4xl bg-zinc-900/20 backdrop-blur-sm">
          <motion.h1
            key={pathname + "ai"}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-[15vw] sm:text-[8vw] text-center font-exorts text-white lg:-mb-10"
          >
            AI / Machine Learning
          </motion.h1>
          <div className="h-[90vw] sm:h-[60vw] md:h-[45vw] lg:h-[40vw] xl:h-[35vw] relative">
            <FlowingMenu marqueeTextColor={"#aaaeb5"} marqueeBgColor={"#393e47"} items={aiMlItems} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
