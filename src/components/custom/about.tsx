"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // TEXT animation
      gsap.from(textRef.current, {
        x: -120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          scrub:true
        },
      })

      // IMAGE animation
      gsap.from(imageRef.current, {
        x: 120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          scrub:true
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black mx-auto max-w-7xl px-6 pt-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* ---------------- TEXT ---------------- */}
        <div ref={textRef}>
          <h2 className="font-exorts text-[20vw] lg:text-[10vw] leading-none mb-6">
            About
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
            I’m a <span className="text-white font-semibold">Computer Science Engineering student</span> at 
            <span className="text-white"> VIT Vellore</span>, passionate about building 
            <span className="text-white"> scalable web platforms</span>, 
            <span className="text-white"> AI-integrated systems</span>, and 
            performance-driven user experiences.
          </p>

        
        </div>

        {/* ---------------- IMAGE ---------------- */}
        <div
        
          ref={imageRef}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="
            relative
            w-72 h-72 md:w-80 md:h-80
            rounded-3xl
            overflow-hidden
            border border-white/10
            shadow-2xl
          ">
            <img

              src="https://media.licdn.com/dms/image/v2/D4E03AQHn_xqbRyB6_w/profile-displayphoto-scale_200_200/B4EZkm93z0GoAY-/0/1757295380467?e=1769644800&v=beta&t=OAv2b1IeMHSVJHYIHHVn1G7rNtIahOGHNGao6WgHbSc"   
              alt="Somasekar Naidu"
              className="w-full h-full object-cover"
            />

            {/* soft glow */}
            <div  className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  )
}
