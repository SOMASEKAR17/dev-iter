"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import CardSwap, { Card } from '@/components/reactBites/cardSwap'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const projectsSectionRef = useRef<HTMLDivElement>(null)
  const projectsTextRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter(); 

  const fullText =
  "A passionate engineering student focused on building impactful web applications, scalable systems, and modern user experiences."

  const [typedText, setTypedText] = useState<string>("")

  useEffect(() => {
    const video = videoRef.current
    const section = heroSectionRef.current
    if (!video || !section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // restart + play when section comes into view
          video.currentTime = 0
          video.play().catch(() => {})
        } else {
          // pause when section leaves
          video.pause()
        }
      },
      {
        threshold: 0.6, // 60% of section visible
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    let i = 0
    let timeout: NodeJS.Timeout

    const type = () => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        const speed =15 

        i++
        timeout = setTimeout(type, speed)
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




  const handleVideoEnd = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = video.duration
  }

  useEffect(() => {
    if (!projectsSectionRef.current || !projectsTextRef.current) return

    gsap.from(
      projectsTextRef.current,
      {
        x: -250,        
        opacity: 0,
        ease: "ease-out",
        scrollTrigger: {
          trigger: projectsSectionRef.current,
          start: "top 75%",   
          end: "top 20%",     
          scrub: true,      
        },
      }
    )
  }, [])


  return (
    <main className="relative font-zalando min-h-screen text-white overflow-hidden">
      
      {/* HERO WRAPPER */}
      <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
        
        {/* VIDEO */}
        <video
          ref={videoRef}
          className="max-h-full max-w-full object-contain"
          src="/hero-bg.mp4"
          muted
          playsInline
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#060818]/70 pointer-events-none" />

        {/* HERO CONTENT */}
        <section
          ref={heroSectionRef}
          className="
            absolute inset-0 z-10
            mx-auto flex
            flex-col items-center justify-center
            px-6 text-center
          "
        >
          <p className="absolute bottom-20 left-0 px-10 text-start mt-6 max-w-2xl text-lg md:text-xl">
            {typedText}
            <span className="ml-1 animate-pulse">|</span>
          </p>
        </section>
      </div>



      {/* ABOUT PREVIEW */}
      <section
        ref={projectsSectionRef}
        className="mx-auto cursor-pointer hover:scale-102 ease-in duration-150 w-full max-w-400 mb-10"
        onClick={()=>router.push('/projects')}
      >
        <div
          className="border-4 h-100 md:h-137 rounded-4xl relative"
          style={{  overflow: "hidden", position: "relative" }}
        >
          {/* SCROLL ANIMATED TEXT */}
          <div
            ref={projectsTextRef}
            className="text-[30vw] left-[30%] absolute lg:top-30 xl:-top-35 md:left-10 font-exorts pointer-events-none select-none"
          >
            Projects
          </div>

          <div className="absolute bottom-10 left-[50%] md:static">
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card>
                <div className="content text-center bg-zinc-900 rounded-t-xl py-2">
                  CROWDER.AI
                </div>
                <div className="imageholder h-80 w-full">
                  <img src="crowder.png" className="object-cover h-full w-full" alt="" />
                </div>
              </Card>
              <Card>
                <div className="content text-center bg-zinc-900 rounded-t-xl py-2">
                  CROWDER.AI
                </div>
                <div className="imageholder h-80 w-full">
                  <img src="crowder.png" className="object-cover h-full w-full" alt="" />
                </div>
              </Card>
              <Card>
                <div className="content text-center bg-zinc-900 rounded-t-xl py-2">
                  CROWDER.AI
                </div>
                <div className="imageholder h-80 w-full">
                  <img src="crowder.png" className="object-cover h-full w-full" alt="" />
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>


      {/* SKILLS PREVIEW */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-3xl font-semibold">Skills</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "MongoDB",
            "Tailwind",
            "Prisma",
            "ML Basics",
          ].map((skill) => (
            <div
              key={skill}
              className="rounded-xl bg-white/5 px-4 py-3 text-center text-sm hover:bg-white/10 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          <p className="text-sm text-gray-400">© 2026 Somasekar</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-400 transition">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
