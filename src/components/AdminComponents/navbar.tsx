"use client"

import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navigation = [
  {
    route:"/admin",
    name:"Dashboard",
    alt:"admin"
  },
  {
    route:"/admin/projects",
    name:"Projects",
    alt:"projects"
  },
  {
    route:"/admin/messages",
    name:"Messages",
    alt:"messages"
  },
  {
    route:"/",
    name:"Exit Admin Panel",
    alt:"exit"
  }
]

const Navbar = () => {
  const pathname = usePathname().split("/")
  const current = pathname[pathname.length-1];
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-4">
          {navigation.map((e)=>(
            <Link key={e.route} href={`${e.route}`} className={`${current==e.alt?"bg-gray-800":""} block p-3 rounded hover:bg-gray-700`}>
              {e.name}
            </Link>
          ))}
        
        </nav>
      </aside>
  )
}

export default Navbar