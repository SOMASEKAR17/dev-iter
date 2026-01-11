"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Menu, X } from "lucide-react"

const GlassSurface = dynamic(
  () => import("./reactBites/GlassSurface"),
  { ssr: false }
)

const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [desktopWidth, setDesktopWidth] = useState(0)


  useEffect(() => {
    if (!menuRef.current) return

    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power3.out"
        }
      )
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.9,
        duration: 0.25,
        ease: "power2.in"
      })
    }
  }, [menuOpen])



  /* ---------------- responsive logic ---------------- */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const mobile = w < 768

      setIsMobile(mobile)

      if (!mobile) {
        setDesktopWidth(w * 0.7) // desktop = 70%
      }
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  /* ---------------- animations ---------------- */
  const handleHover = (i: number) => {
    const el = linkRefs.current[i]
    if (!el) return
    gsap.to(el, { y: -6, scale: 1.08, duration: 0.35, ease: "back.out(2.5)" })
  }

  const handleLeave = (i: number) => {
    const el = linkRefs.current[i]
    if (!el) return
    gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" })
  }

  const handleClick = (i: number) => {
    const el = linkRefs.current[i]
    if (!el) return

    gsap.timeline()
      .to(el, { scale: 0.9, y: 2, duration: 0.12 })
      .to(el, { scale: 1.05, y: -4, duration: 0.25, ease: "back.out(3)" })
  }


  return (
    <div className={`fixed  ${isMobile?"left-10 top-4":"left-1/2 -translate-x-1/2 top-4"} z-50`}>

      {!isMobile && (
        <GlassSurface
          width={desktopWidth}
          borderRadius={20}
          backgroundOpacity={0.5}
          saturation={1}
          borderWidth={0.07}
          displace={2}
          distortionScale={-180}
          blur={11}
          brightness={50}
          opacity={3}
          mixBlendMode="screen"
        >
          <nav className="flex font-zalando items-center justify-center gap-8 px-8 py-3">
            {links.map((link, i) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => { linkRefs.current[i] = el }}
                  onMouseEnter={() => handleHover(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onMouseDown={() => handleClick(i)}
                  className={`relative transition-colors duration-200
                    ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="block h-0.5 mt-1 bg-white rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>
        </GlassSurface>
      )}

      {isMobile && (
        <>
          {/* -------- round toggle button -------- */}
          <div className="absolute">
            <GlassSurface
              width={64}
              height={64}
              borderRadius={999}
              backgroundOpacity={0.5}
              saturation={1}
              borderWidth={0.07}
              blur={11}
              brightness={50}
              opacity={3}
              mixBlendMode="screen"
            >
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="w-16 h-16 flex items-center justify-center text-white"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </GlassSurface>
          </div>

          {/* -------- menu glass -------- */}
          {menuOpen && (
            <div ref={menuRef} className="absolute top-20 left-1">
              <GlassSurface
                width={220}
                height={300}
                borderRadius={18}
                backgroundOpacity={0.6}
                saturation={1}
                borderWidth={0.07}
                blur={12}
                brightness={60}
                opacity={3}
              >
                <div className="flex flex-col gap-4 px-6 py-5 font-zalando">
                  {links.map(link => {
                    const isActive = pathname === link.href

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`transition-colors
                          ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                </div>
              </GlassSurface>
            </div>
          )}
        </>
      )}
    </div>
  )
}
