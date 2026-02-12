"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
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
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
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
                "
              >
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

                <p className="mt-4 text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>

  );
}
