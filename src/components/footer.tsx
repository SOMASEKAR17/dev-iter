"use client"

import React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { usePathname } from "next/navigation"
import { RiDiscordLine } from "react-icons/ri"

const Footer = () => {
  const pathname = usePathname()

  const hiddenPaths = ["/login", "/admin", "/projects/"]

  const shouldHideFooter = hiddenPaths.some(
    path => pathname === path || pathname.startsWith(path)
  )

  if (shouldHideFooter) return null

  return (
    <footer className="border-t border-white/10 bg-black/60 py-12 text-gray-400">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-3">

        {/* ---------------- CONTACT INFO ---------------- */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> somasekarnaidu79@email.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 9380648279
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> India
            </li>
          </ul>
        </div>

        {/* ---------------- QUICK LINKS ---------------- */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link href="/projects" className="hover:text-indigo-400">Projects</Link></li>
            <li><Link href="/skills" className="hover:text-indigo-400">Skills</Link></li>
            <li><Link href="/#about" className="hover:text-indigo-400">About</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-400">Contact</Link></li>
          </ul>
        </div>

        {/* ---------------- SOCIAL LINKS ---------------- */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Follow Me
          </h3>
          <div className="flex gap-4">
            <a href="https://github.com/SOMASEKAR17" target="_blank" className="hover:text-indigo-400 transition">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/somasekar-naidu-841646320/" target="_blank" className="hover:text-indigo-400 transition">
              <Linkedin size={18} />
            </a>
            <a href="https://discord.com/users/somasekarnaidu" className="hover:text-indigo-400 transition">
              <RiDiscordLine size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- BOTTOM BAR ---------------- */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 pt-6 text-xs md:flex-row">
        <p>© 2026 Somasekar. All Rights Reserved.</p>
        <Link href="/privacy-policy" className="hover:text-indigo-400">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
