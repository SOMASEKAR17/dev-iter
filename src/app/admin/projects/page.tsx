"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase";
import { type Projects } from '@/types';
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react"
import {type Project} from "@/types"

const auth = getAuth(app);

export default function AdminPage() {
  const router = useRouter();

  const getLinks = (link: Project["link"]) => {
    if (typeof link === "string") {
      return { github: link !== "#" ? link : null, linkedin: null }
    }
  
    return {
      github: link?.Github || null,
      linkedin: link?.linkedIn || null,
    }
  }

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Projects>([]);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setCheckingAuth(false);
        router.replace("/admin/login");
        return;
      }

      setUser(currentUser);

      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen">
      {checkingAuth && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      )}
      {!checkingAuth && user && (
        <div className="text-black">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project)=>(
                    <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                    className="
                    cursor-pointer
                    rounded-2xl
                    bg-white backdrop-blur-md
                    p-6
                    hover:bg-zinc-200
                    transition
                    "
                >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold">{project.title}</h2>
                        <span className="text-xs text-zinc-600">
                        {new Date(project.createdAt).toDateString()}
                        </span>
                    </div>
                    {(() => {
                        const { github, linkedin } = getLinks(project.link)

                        return (
                        <div
                            className="flex items-center gap-2"
                            onClick={(e) => e.stopPropagation()} // prevent card click
                        >
                            {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                            >
                                <Github size={14} />
                            </a>
                            )}

                            {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                            >
                                <Linkedin size={14} />
                            </a>
                            )}
                        </div>
                        )
                    })()}
                    </div>


                    <p className="mt-4 text-zinc-800 leading-relaxed">
                    {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                    {Object.entries(project.techstack).map(([name, logo]) => (
                        <div
                        key={name}
                        className="
                            flex items-center gap-2
                            rounded-full
                            bg-zinc-200
                            px-3 py-1
                            text-xs text-zinc-800
                            backdrop-blur
                            hover:bg-white/20
                            transition
                        "
                        >
                        <img
                            src={logo}
                            alt={name}
                            className="h-4 w-4 object-contain"
                        />
                        <span>{name}</span>
                        </div>
                    ))}
                    </div>
                </motion.div>
                        ))}
                    </div>
                </div>
            )}
    </div>
  );
}
