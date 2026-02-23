"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navigation = [
  { route: "/admin", name: "Dashboard", alt: "admin" },
  { route: "/admin/projects", name: "Projects", alt: "projects" },
  { route: "/admin/skills", name: "Skills", alt: "skills" },
  { route: "/admin/messages", name: "Messages", alt: "messages" },
  { route: "/", name: "Exit Admin Panel", alt: "exit" },
]

const Navbar = () => {
  const pathname = usePathname().split("/")
  const current = pathname[pathname.length - 1]

  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-full bg-zinc-900/70 p-3 hover:bg-zinc-900/90 border border-white/10 lg:hidden"
      >
        <Menu size={20} className="text-white" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static h-screen top-0 left-0 z-50 w-64
          bg-zinc-800 text-white p-6
          transform transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Admin Panel</h1>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full bg-zinc-900/70 p-2 hover:bg-zinc-900/90 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-4">
          {navigation.map((e) => (
            <Link
              key={e.route}
              href={`${e.route}`}
              className={`block p-3 rounded hover:bg-zinc-700 ${
                current === e.alt ? "bg-zinc-600" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {e.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Navbar
