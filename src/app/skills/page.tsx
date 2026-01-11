"use client"

import FlowingMenu from "@/components/reactBites/flowingMenue"
import { useLayoutEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Page = () => {
  const webHeaderRef = useRef<HTMLHeadingElement>(null)
  const aiHeaderRef = useRef<HTMLHeadingElement>(null)

  const pathname = usePathname() // 👈 important for navigation fix

  /* ---------------- LANGUAGES ---------------- */
  const languagesItems = [
    { link: "#", text: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { link: "#", text: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { link: "#", text: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { link: "#", text: "C", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { link: "#", text: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { link: "#", text: "Go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  ]

  /* ---------------- WEB DEV ---------------- */
  const webDevItems = [
    { link: "#", text: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { link: "#", text: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { link: "#", text: "Tailwind CSS", image: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { link: "#", text: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { link: "#", text: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { link: "#", text: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { link: "#", text: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { link: "#", text: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ]

  /* ---------------- AI / ML ---------------- */
  const aiMlItems = [
    { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { link: "#", text: "NumPy", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { link: "#", text: "Pandas", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { link: "#", text: "Scikit-learn", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
    { link: "#", text: "TensorFlow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { link: "#", text: "PyTorch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { link: "#", text: "OpenAI APIs", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { link: "#", text: "LangChain", image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
  ]

  /* ---------------- GSAP FIXED ---------------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (webHeaderRef.current) {
        gsap.from(webHeaderRef.current, {
          x: -300,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: webHeaderRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        })
      }

      if (aiHeaderRef.current) {
        gsap.from(aiHeaderRef.current, {
          x: 300,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aiHeaderRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        })
      }
    })

    // 🔥 makes GSAP work after route navigation
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [pathname]) // 👈 rerun on every navigation

  return (
    <div className="min-h-screen max-w-400 py-30 mx-auto relative px-6 space-y-24">

      {/* ---------------- LANGUAGES ---------------- */}
      <section className="relative">
        <h2 className="text-[15vw] font-exorts text-white mb-8">
          Languages
        </h2>

        <div style={{ height: "60vh", position: "relative" }}>
          <FlowingMenu items={languagesItems} />
        </div>
      </section>

      {/* ---------------- WEB DEV ---------------- */}
      <section className="relative">
        <h2
          ref={webHeaderRef}
          className="text-[15vw] font-exorts text-white mb-8"
        >
          Web Development
        </h2>

        <div style={{ height: "60vh", position: "relative" }}>
          <FlowingMenu items={webDevItems} />
        </div>
      </section>

      {/* ---------------- AI / ML ---------------- */}
      <section className="relative overflow-hidden">
        <h2
          ref={aiHeaderRef}
          className="text-[15vw] text-end font-exorts text-white mb-8"
        >
          AI / Machine Learning
        </h2>

        <div style={{ height: "60vh", position: "relative" }}>
          <FlowingMenu items={aiMlItems} />
        </div>
      </section>

    </div>
  )
}

export default Page
