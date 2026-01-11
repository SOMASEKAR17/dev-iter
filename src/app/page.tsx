"use client"

import { useLayoutEffect, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import CardSwap, { Card } from "@/components/reactBites/cardSwap"
import MagicBento from "@/components/reactBites/MagicBento"
import HorizontalScroll from "@/components/custom/horizontalScroll"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const projectsSectionRef = useRef<HTMLDivElement>(null)
  const projectsTextRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const skillsSectionRef = useRef<HTMLDivElement>(null)
  const skillsTextRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()   // 👈 KEY FIX

  const fullText =
    "A passionate engineering student focused on building impactful web applications, scalable systems, and modern user experiences."

  const [typedText, setTypedText] = useState("")

  /* ---------------- GSAP ANIMATIONS ---------------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (skillsSectionRef.current && skillsTextRef.current) {
        gsap.from(skillsTextRef.current, {
          x: 250,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: "top 75%",
            end: "top 20%",
            scrub: true,
          },
        })
      }

      if (projectsSectionRef.current && projectsTextRef.current) {
        gsap.from(projectsTextRef.current, {
          x: -250,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 75%",
            end: "top 20%",
            scrub: true,
          },
        })
      }
    })

    // 🔥 force recalculation after navigation
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [pathname])   // 👈 reruns on every page navigation

  /* ---------------- VIDEO INTERSECTION ---------------- */
  useEffect(() => {
    const video = videoRef.current
    const section = heroSectionRef.current
    if (!video || !section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  /* ---------------- TYPEWRITER ---------------- */
  useEffect(() => {
    let i = 0
    let timeout: NodeJS.Timeout

    const type = () => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
        timeout = setTimeout(type, 15)
      } else {
        timeout = setTimeout(() => {
          i = 0
          setTypedText("")
          type()
        }, 30000)
      }
    }

    type()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <main className="relative font-zalando min-h-screen text-white overflow-hidden">

      {/* HERO */}
      <div className="relative h-screen w-full pb-[30vh] sm:pb-0 bg-black overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          className="max-h-full max-w-full object-contain"
          src="/hero-bg.mp4"
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[#060818]/70 pointer-events-none" />

        <section
          ref={heroSectionRef}
          className="absolute inset-0 z-10 mx-auto flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="absolute bottom-20 left-0 px-10 text-start mt-6 max-w-2xl text-lg md:text-xl">
            {typedText}
            <span className="ml-1 animate-pulse">|</span>
          </p>
        </section>
      </div>

      {/* PROJECTS */}
      <section
        ref={projectsSectionRef}
        className="xl:mx-auto px-10 cursor-pointer hover:scale-102 ease-in duration-150 w-full max-w-400 mb-10"
        onClick={() => router.push("/projects")}
      >
        <div className="border-4 h-100 md:h-137 rounded-4xl relative overflow-hidden">
          <div
            ref={projectsTextRef}
            className="text-[30vw] left-[30%] sm:-top-15 absolute lg:top-30 xl:-top-35 md:left-10 font-exorts pointer-events-none select-none"
          >
            Projects
          </div>

          <div className="absolute bottom-10 left-[50%] md:static">
            <CardSwap cardDistance={60} verticalDistance={70} delay={5000}>
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <div className="content text-center bg-zinc-900 rounded-t-xl py-2">
                    CROWDER.AI
                  </div>
                  <div className="imageholder h-80 w-full">
                    <img src="crowder.png" className="object-cover h-full w-full" />
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        ref={skillsSectionRef}
        onClick={() => router.push("/skills")}
        className="mx-auto max-w-400 cursor-pointer hover:scale-102 ease-in duration-150 px-10 pb-24"
      >
        <div className="border-4 relative overflow-hidden rounded-4xl flex flex-col lg:flex-row">

          <div
            ref={skillsTextRef}
            className="
              font-exorts select-none pointer-events-none
              text-[35vw] sm:text-[25vw] lg:text-[30vw]
              leading-none
              static w-full text-center mb-4
              lg:absolute lg:top-24 lg:-right-100
            "
          >
            Skills
          </div>

          <div className="w-full">
            <MagicBento
              textAutoHide
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt
              enableMagnetism
              clickEffect
              spotlightRadius={300}
              particleCount={12}
              glowColor="7, 11, 24"
            />
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL */}
      <section>
        <HorizontalScroll />
      </section>

    </main>
  )
}
