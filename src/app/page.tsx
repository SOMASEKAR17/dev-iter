"use client"

import { useLayoutEffect, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import CardSwap, { Card } from "@/components/reactBites/cardSwap"
import MagicBento from "@/components/reactBites/MagicBento"
import HorizontalScroll from "@/components/custom/horizontalScroll"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AboutSection from "@/components/custom/about"
import JourneyTimeline from "@/components/custom/timeline"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const projectsSectionRef = useRef<HTMLDivElement>(null)
  const projectsTextRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const skillsSectionRef = useRef<HTMLDivElement>(null)
  const skillsTextRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()  

  useEffect(() => {
  if (!socialsRef.current) return

  gsap.fromTo(
      socialsRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      }
    )
  }, [])


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
    <main className="relative bg-black font-zalando min-h-screen text-white overflow-hidden">

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
          className="
            absolute inset-0 z-10
            flex flex-col items-center justify-center
            px-6 text-center
          "
        >
          <p
            className="
              absolute bottom-20 left-0
              px-6 md:px-10
              text-left
              max-w-2xl
              text-base md:text-xl
            "
          >
            {typedText}
            <span className="ml-1 animate-pulse">|</span>
          </p>

          <div
            ref={socialsRef}
            className="
              absolute bottom-50 right- lg:right-15 lg:bottom-20 xl:right-20 scale-200
              px-6 md:px-10
            "
          >
            <div className="flex items-center gap-4 text-white">
              {/* GitHub */}
              <a href="https://github.com/SOMASEKAR17" className="hover:text-indigo-400 transition" aria-label="GitHub">
                <Github size={18} />
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/somasekar-naidu-841646320/" className="hover:text-indigo-400 transition" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>

              {/* Mail */}
              <a href="mailto:somasekarnaidu79@gmail.com" className="hover:text-indigo-400 transition" aria-label="Mail">
                <Mail size={18} />
              </a>

              {/* Phone */}
              <a href="tel:+919380648279" className="hover:text-indigo-400 transition" aria-label="Phone">
                <Phone size={18} />
              </a>

              {/* LeetCode */}
              <a
                href="https://leetcode.com/u/SOMASEKAR6689/"
                target="_blank"
                rel="noopener noreferrer"
                className=""
                aria-label="LeetCode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5 hover:text-indigo-400  transition text-white"
                >
                  <path d="M20.303 16.047h-9.561c-.936 0-1.697-.803-1.697-1.79s.762-1.79 1.697-1.79h9.561c.936 0 1.697.803 1.697 1.79s-.762 1.79-1.697 1.79zm-9.561-2.58c-.385 0-.697.354-.697.79s.312.79.697.79h9.561c.385 0 .697-.354.697-.79s-.312-.79-.697-.79h-9.561z"></path>
                  <path d="M11.618 24c-1.604 0-2.977-.533-3.97-1.541L3.55 18.278C2.551 17.262 2 15.819 2 14.215c0-1.578.551-3.008 1.552-4.025L13.071.509c.66-.67 1.829-.652 2.506.036.694.706.71 1.839.034 2.524l-1.762 1.816a5.25 5.25 0 0 1 1.739 1.159l2.463 2.53c.672.684.655 1.815-.039 2.521a1.79 1.79 0 0 1-1.284.545c-.464 0-.896-.181-1.219-.509l-2.536-2.492c-.321-.327-.779-.49-1.367-.49-.606 0-1.069.157-1.375.469l-4.067 4.194c-.342.349-.521.831-.521 1.4 0 .577.189 1.101.519 1.436l4.083 4.182c.315.321.774.484 1.362.484s1.045-.163 1.36-.484l2.549-2.505a1.687 1.687 0 0 1 1.209-.503h.002c.483 0 .939.194 1.286.546.693.705.71 1.837.036 2.522l-2.457 2.525C14.586 23.438 13.176 24 11.618 24zM14.29 1a.703.703 0 0 0-.507.21l-9.519 9.681C3.449 11.72 3 12.9 3 14.215c0 1.341.449 2.535 1.265 3.363l.001.001 4.097 4.18C9.162 22.57 10.288 23 11.618 23c1.288 0 2.444-.455 3.258-1.282l2.457-2.525c.295-.301.279-.804-.034-1.122a.801.801 0 0 0-.573-.247h-.001a.703.703 0 0 0-.502.209l-2.549 2.505c-.497.507-1.214.778-2.068.778s-1.572-.271-2.076-.784L5.446 16.35c-.519-.527-.805-1.286-.805-2.136 0-.824.286-1.57.806-2.099l4.067-4.194c.503-.512 1.206-.771 2.091-.771.854 0 1.571.271 2.074.783l2.536 2.492a.705.705 0 0 0 .512.216.798.798 0 0 0 .571-.246c.313-.319.33-.822.037-1.121l-2.461-2.528a4.238 4.238 0 0 0-2.028-1.137c-.175-.041-.331-.176-.382-.349s-.021-.363.104-.492l2.325-2.398c.298-.302.282-.805-.031-1.124A.799.799 0 0 0 14.29 1z"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>


      </div>

      {/* PROJECTS */}
      <section
        ref={projectsSectionRef}
        className="xl:mx-auto px-10 cursor-pointer bg-black hover:scale-102 ease-in duration-150 w-full max-w-400 mb-10"
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
        className="mx-auto max-w-400 bg-black cursor-pointer hover:scale-102 ease-in duration-150 px-10 pb-24"
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
      <AboutSection/>
      <JourneyTimeline/>

      {/* HORIZONTAL SCROLL */}
      <section>
        <HorizontalScroll />
      </section>


    </main>
  )
}
