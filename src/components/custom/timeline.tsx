"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type TimelineType = "hackathon" | "internship" | "project";

interface TimelineItem {
  date: string;
  title: string;
  type: TimelineType;
  desc: string;
}


// ---------------- DATA ----------------
const timelineData: TimelineItem[] = [
  {
    date: "Nov 2024",
    title: "Runner-Up – Python API Hackathon",
    type: "hackathon",
    desc: "Secured Runner-Up position at the MIDAS Python API Hackathon by building API-based automation tools that improved integration and efficiency in civil engineering software systems.",
  },
  {
    date: "Apr 2025",
    title: "1st Runner-Up – CodeDoc 2.0 Hackathon",
    type: "hackathon",
    desc: "Won 1st Runner-Up at the IEEE PES CodeDoc 2.0 Hackathon by developing a full-stack financial management platform with interactive analytics and real-time investment insights.",
  },
  {
    date: "May 2025",
    title: "FintechX – Full Stack Project",
    type: "project",
    desc: "Built a full-stack financial management platform with EMI/SIP calculators, real-time financial news, and an AI-powered chatbot using React, Node.js, Express, MongoDB, and Flask with secure JWT-based authentication.",
  },
  {
    date: "May – Aug 2025",
    title: "GenReal AI – Frontend Developer Intern",
    type: "internship",
    desc: "Worked as a Frontend Developer Intern, building scalable UI systems using React, Tailwind CSS, and GSAP. Improved performance with lazy loading, code splitting, and modular component architecture.",
  },
  {
    date: "Aug 2025",
    title: "Rental Price Prediction – ML Project",
    type: "project",
    desc: "Developed a machine learning model to predict rental prices using historical housing data, applying feature engineering and regression techniques with Python and Scikit-Learn.",
  },
  {
    date: "Sep 2025",
    title: "Crowder.AI – AI Simulation Platform",
    type: "project",
    desc: "Built an AI-driven project simulation platform with real-time 3D visualization using Three.js. Optimized frontend performance and synchronization, reducing load times by 40%.",
  },
  {
    date: "Nov 2025 – Present",
    title: "CodeChef VIT – Senior Core Member",
    type: "internship",
    desc: "Serving as a Senior Core Member and Full Stack Web Developer, contributing to large-scale platforms used by thousands of students while mentoring juniors and supporting major technical events.",
  },
]

// ---------------- STYLE MAP ----------------
const typeStyles:Record<TimelineType, {
  badge: string;
  dot: string;
  icon: string;
}> = {
  hackathon: {
    badge: "bg-pink-500/10 text-pink-400 border-pink-400/30",
    dot: "bg-pink-500",
    icon: "🏆",
  },
  internship: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    dot: "bg-blue-500",
    icon: "💼",
  },
  project: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/30",
    dot: "bg-emerald-500",
    icon: "🛠️",
  },
}

// ---------------- COMPONENT ----------------
export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // LINE GROW
      gsap.fromTo(
        progressRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      )

      // ICON MOVE
      const lineHeight = lineRef.current!.offsetHeight - 40

        gsap.to(iconRef.current, {
        y: lineHeight,
        ease: "none",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
            onUpdate: (self) => {
            if (!progressRef.current || !iconRef.current) return

            const progress = self.progress
            const maxTravel = lineRef.current!.offsetHeight - 30

            gsap.set(iconRef.current, {
                y: progress * maxTravel,
            })
            },
        },
        })



      // FADE IN ITEMS (with type-based motion)
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el) => {
          const side = el.getAttribute("data-side")
          const isMobile = window.innerWidth < 1024

          let fromX = 0

          if (isMobile) {
            // ALL items come from right on mobile
            fromX = 60
          } else {
            fromX = side === "left" ? -60 : 60
          }

          gsap.from(el, {
            opacity: 0,
            y: 40,
            x: fromX,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            },
          })
        })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black mx-auto max-w-7xl px-6 pb-20 md:pb-5"
    >
      {/* -------- TITLE -------- */}
      <h2 className="font-exorts text-center text-[20vw] lg:text-[10vw] mb-24">
        Journey
      </h2>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-20">

        {/* -------- LEFT COLUMN -------- */}
        <div className="space-y-24">
          {timelineData.map((item, i) =>
            i % 2 === 0 ? (
              <div
                key={i}
                data-side="left"
                data-type={item.type}
                className="
                    timeline-item
                    text-left
                    pl-16 pr-4
                    lg:text-right lg:pl-0 lg:pr-10
                    "
              >
                <span className="text-sm text-gray-400">{item.date}</span>

                {/* TYPE BADGE */}
                <div
                  className={`inline-flex items-center gap-2 mt-2 px-3 py-1 text-xs border rounded-full
                  ${typeStyles[item.type].badge}`}
                >
                  <span>{typeStyles[item.type].icon}</span>
                  <span className="uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ) : null
          )}
        </div>

        {/* -------- RIGHT COLUMN -------- */}
        <div className="space-y-24 mt-24 lg:mt-40">
          {timelineData.map((item, i) =>
            i % 2 !== 0 ? (
              <div
                key={i}
                data-side="right"
                data-type={item.type}
                className="
                    timeline-item
                    text-left
                    pl-16 pr-4
                    lg:text-left lg:pl-10 lg:pr-0
                    "

              >
                <span className="text-sm text-gray-400">{item.date}</span>

                {/* TYPE BADGE */}
                <div
                  className={`inline-flex items-center gap-2 mt-2 px-3 py-1 text-xs border rounded-full
                  ${typeStyles[item.type].badge}`}
                >
                  <span>{typeStyles[item.type].icon}</span>
                  <span className="uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ) : null
          )}
        </div>

        {/* -------- CENTER LINE -------- */}
        <div
        ref={lineRef}
        className="
            absolute
            left-6 lg:left-1/2
            top-0
            lg:-translate-x-1/2
            h-full
            w-[2px]
            bg-white/10
        "
        >

          {/* PROGRESS LINE */}
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-white"
            style={{ height: "0%" }}
          />

          {/* MOVING ICON */}
          <div
            ref={iconRef}
            className="
              absolute left-1/2 -translate-x-1/2
              w-10 h-10
              rounded-full
              bg-white text-black
              flex items-center justify-center
              font-bold
              shadow-xl
            "
          >
            🚀
          </div>

          {/* TYPE DOTS */}
          {timelineData.map((item, i) => (
            <div
              key={i}
              className={`
                absolute left-1/2 -translate-x-1/2
                w-3 h-3 rounded-full
                ${typeStyles[item.type].dot}
              `}
              style={{
                top: `${(i / (timelineData.length - 1)) * 100}%`,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
