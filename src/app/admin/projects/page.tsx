"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase";
import { motion } from "framer-motion";
import { Github, Linkedin, Plus, ArrowUpDown } from "lucide-react";
import { type Projects, type Project } from "@/types";
import ProjectDetailsEditPage from "@/components/custom/ProjectEditCard";

const auth = getAuth(app);

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Projects>([]);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [openCard, setOpenCard] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const getLinks = (link: Project["link"]) => {
    if (typeof link === "string") {
      return { github: link !== "#" ? link : null, linkedin: null };
    }
    return {
      github: link?.Github || null,
      linkedin: link?.linkedIn || null,
    };
  };

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
        const data = await res.json();
        setProjects(data);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAddProject = () => {
    const newId = `new-${Date.now()}`;
    setActiveProjectId(newId);
    setOpenCard(true);
  };

  return (
    <div className="min-h-screen p-8 pt-20 relative bg-black text-white">
      {openCard && activeProjectId && (
        <ProjectDetailsEditPage
          id={activeProjectId}
          setOpenCard={setOpenCard}
        />
      )}

      {checkingAuth && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      )}

      {!checkingAuth && user && (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                <ArrowUpDown size={12} />
                Sorted by priority order (lower number = higher priority)
              </p>
            </div>
            <button
              onClick={handleAddProject}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all hover:scale-[0.98]"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  setActiveProjectId(project.id)
                  setOpenCard(true)
                }}
                className="
                  cursor-pointer
                  rounded-2xl
                  bg-zinc-800
                  backdrop-blur-xl
                  border border-white/10
                  p-6
                  hover:bg-zinc-700
                  hover:border-white/20
                  transition
                  relative
                "
              >
                {/* Priority Order Badge */}
                <div className="absolute -top-2.5 -right-2.5 bg-white text-black text-[10px] font-black w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-black">
                  {project.order ?? index}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {project.title}
                    </h2>
                    <span className="text-xs text-gray-400">
                      {new Date(project.createdAt).toDateString()}
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const { github, linkedin } = getLinks(project.link)
                      return (
                        <>
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
                        </>
                      )
                    })()}
                  </div>
                </div>

                <p className="mt-4 text-gray-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
                  <ArrowUpDown size={10} />
                  Priority: {(project as any).order ?? 0}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>

  );
}
