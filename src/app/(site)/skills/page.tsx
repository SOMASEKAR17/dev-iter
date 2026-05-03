"use client"

import { useState, useEffect } from "react"
import FlowingMenu from "@/components/reactBites/flowingMenue"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const Page = () => {
  const pathname = usePathname();
  const [skills, setSkills] = useState<Record<string, any[]>>({})
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

  return (
    <div className="min-h-screen pt-30 pb-20 px-6 bg-black">
      <div className="grid-cols-1 grid md:grid-cols-2 mx-auto relative gap-10 max-w-350">
        {Object.entries(skills).map(([category, items], index) => (
          <section key={category} className="relative border border-white/10 rounded-4xl bg-zinc-900/20 backdrop-blur-sm overflow-hidden">
            <motion.h1
              key={pathname + category}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="text-[15vw] sm:text-[8vw] text-center font-exorts text-white lg:-mb-10 px-4 capitalize"
            >
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </motion.h1>
            <div className="h-[80vw] sm:h-[65vw] md:h-[47vw] lg:h-[40vw] xl:h-[35vw] relative">
              <FlowingMenu marqueeTextColor={"#aaaeb5"} marqueeBgColor={"#393e47"} items={items} />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Page
