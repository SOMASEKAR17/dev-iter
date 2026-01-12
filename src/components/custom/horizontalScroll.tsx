"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll: React.FC = () => {
  const races = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState<number>(0);
  const [amtToScroll, setAmtToScroll] = useState<number>(0);

  const text1 = "CODE - COFFEE -";
  const text2 = "CREATE - REPEAT";
  const combinedText = `${text1} ${text2}`;

  // Handle resize + initial width safely
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      if (races.current) {
        const scrollAmount =
          races.current.scrollWidth - newWidth + newWidth * 0.1;
        setAmtToScroll(scrollAmount);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!races.current || !textRef.current || amtToScroll <= 0) return;

      const ctx = gsap.context(() => {
        gsap.to(races.current!, {
          x: -amtToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: ".racewrapper",
            start: "top 10%",
            end: "+=" + amtToScroll,
            pin: true,
            scrub: 1,

            onUpdate: (self) => {
              const velocity = self.getVelocity();
              const shear = gsap.utils.clamp(-0.35, 0.35, velocity / -1500);

              gsap.to(textRef.current!, {
                "--shear": shear as any,
                ease: "power3.out",
                duration: 0.3,
              });
            },

            onLeave: () =>
              gsap.to(textRef.current!, { "--shear": 0, duration: 1.5 } as any),

            onLeaveBack: () =>
              gsap.to(textRef.current!, { "--shear": 0, duration: 1.5 } as any),
          },
        });
      });

      return () => ctx.revert();
    },
    [amtToScroll]
  );

  return (
    <div className="w-full hidden md:block">
      <div className="racewrapper font-500 overflow-hidden bg-black text-white">
        <div
          ref={races}
          className="flex font-extrabold gap-[10vw] px-[10vw] py-[2vw]"
        >
          <div className="flex items-center h-screen whitespace-nowrap">
            <div
              ref={textRef}
              className="text-[9vw] capitalize leading-[8vw] whitespace-nowrap"
              style={
                {
                  display: "inline-flex",
                  fontWeight: 900,
                  "--shear": "0",
                  transformOrigin: "bottom left",
                  whiteSpace: "nowrap",
                } as React.CSSProperties
              }
            >
              {[...combinedText].map((ch, i) => (
                <span
                  key={i}
                  className="scale-y-200"
                  style={
                    {
                      display: "inline-block",
                      transform: "matrix(1, 0, var(--shear), 1, 0, 0)",
                      transformOrigin: "bottom left",
                      willChange: "transform",
                    } as React.CSSProperties
                  }
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
