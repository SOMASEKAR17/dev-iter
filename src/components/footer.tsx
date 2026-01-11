'use client'

import React from 'react'
import { Github, Linkedin, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

const footer = () => {
  const pathname = usePathname()

  const hiddenPaths = ["/login", "/admin", "/projects/"]

  const shouldHideFooter = hiddenPaths.some(path =>
    pathname === path || pathname.startsWith(path)
  )
  return (
    <footer className={`border-t h-[32vh] ${shouldHideFooter&&"hidden"} border-white/10 py-10`}>
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
  )
}

export default footer