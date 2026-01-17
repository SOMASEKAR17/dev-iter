"use client"

import React from 'react'
import Link from "next/link";

const Navbar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-4">
          <Link href="/admin" className="block p-3 rounded bg-gray-800 hover:bg-gray-700">
            Dashboard
          </Link>

          <Link href="/admin/projects" className="block p-3 rounded hover:bg-gray-700">
            Projects
          </Link>

          <Link href="/admin/contact" className="block p-3 rounded hover:bg-gray-700">
            Messages
          </Link>

          <Link href="/" className="block p-3 rounded hover:bg-gray-700 text-red-400">
            Exit Admin
          </Link>
        </nav>
      </aside>
  )
}

export default Navbar