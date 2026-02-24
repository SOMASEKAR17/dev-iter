"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import { SiTryhackme } from "react-icons/si";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { LuChefHat } from "react-icons/lu";
import { IoBag } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

type TimelineType = "hackathon" | "internship" | "project" | "club";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  type: TimelineType;
  desc: string;
}

// ---------------- STYLE MAP ----------------
const typeStyles: Record<
  TimelineType,
  {
    badge: string;
    dot: string;
    icon: ReactNode;
  }
> = {
  hackathon: {
    badge: "bg-pink-500/10 text-pink-400 border-pink-400/30",
    dot: "bg-pink-500",
    icon: <SiTryhackme />,
  },
  internship: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    dot: "bg-blue-500",
    icon: <IoBag />,
  },
  project: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/30",
    dot: "bg-emerald-500",
    icon: <AiOutlineFundProjectionScreen />,
  },
  club: {
    badge: "bg-zinc-500/10 text-zinc-400 border-zinc-400/30",
    dot: "bg-zinc-500",
    icon: <LuChefHat />,
  },
};

// ---------------- COMPONENT ----------------
export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/timeline")
      .then(res => res.json())
      .then(data => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch timeline:", err);
        setLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    if (loading || timelineData.length === 0) return;

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
      );

      // ICON MOVE
      const lineHeight = lineRef.current!.offsetHeight - 40;

      gsap.to(iconRef.current, {
        y: lineHeight,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
          onUpdate: (self) => {
            if (!progressRef.current || !iconRef.current) return;

            const progress = self.progress;
            const maxTravel = lineRef.current!.offsetHeight - 30;

            gsap.set(iconRef.current, {
              y: progress * maxTravel,
            });
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el) => {
        const side = el.getAttribute("data-side");
        const isMobile = window.innerWidth < 1024;

        let fromX = 0;

        if (isMobile) {
          fromX = 60;
        } else {
          fromX = side === "left" ? -60 : 60;
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
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, timelineData]);

  if (loading) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-black mx-auto max-w-7xl px-6 pb-20 md:pb-5"
    >
      <h2 className="font-exorts text-center text-[20vw] lg:text-[10vw] mb-24">
        Journey
      </h2>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-20">
        <div className="space-y-24">
          {timelineData.map((item, i) =>
            i % 2 === 0 ? (
              <div
                key={i}
                data-side="left"
                className="
                    timeline-item
                    text-left
                    pl-16 pr-4
                    lg:text-right lg:pl-0 lg:pr-10
                    "
              >
                <span className="text-sm mx-2 text-gray-400">{item.date}</span>
                <div
                  className={`inline-flex items-center gap-2 mt-2 px-3 py-1 text-xs border rounded-full
                  ${typeStyles[item.type as TimelineType].badge}`}
                >
                  <span>{typeStyles[item.type as TimelineType].icon}</span>
                  <span className="uppercase tracking-wider">{item.type}</span>
                </div>

                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ) : null
          )}
        </div>
        <div className="space-y-24 mt-24 lg:mt-40">
          {timelineData.map((item, i) =>
            i % 2 !== 0 ? (
              <div
                key={i}
                data-side="right"
                className="
                    timeline-item
                    text-left
                    pl-16 pr-4
                    lg:text-left lg:pl-10 lg:pr-0
                    "
              >
                <span className="text-sm mx-2 text-gray-400">{item.date}</span>
                <div
                  className={`inline-flex items-center gap-2 mt-2 px-3 py-1 text-xs border rounded-full
                  ${typeStyles[item.type as TimelineType].badge}`}
                >
                  <span>{typeStyles[item.type as TimelineType].icon}</span>
                  <span className="uppercase tracking-wider">{item.type}</span>
                </div>

                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ) : null
          )}
        </div>
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
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-white"
            style={{ height: "0%" }}
          />
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
            <FontAwesomeIcon icon={faPersonBiking} />
          </div>

          {timelineData.map((item, i) => (
            <div
              key={i}
              className={`
                absolute left-1/2 -translate-x-1/2
                w-3 h-3 rounded-full
                ${typeStyles[item.type as TimelineType].dot}
              `}
              style={{
                top: `${(i / (timelineData.length - 1)) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
