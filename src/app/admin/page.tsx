"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase";

import { Save, Loader2 } from "lucide-react";

const auth = getAuth(app);

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [config, setConfig] = useState<{featuredProjects: any[]}>({ featuredProjects: [] });
  const [savingConfig, setSavingConfig] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser || currentUser.email !== "somasekarnaidu79@gmail.com") {
        setCheckingAuth(false);
        router.replace("/admin/login");
        return;
      }

      setUser(currentUser);

      try {
        const [projectsRes, configRes] = await Promise.all([
          fetch("/api/projects", { cache: "no-store" }),
          fetch("/api/config", { cache: "no-store" })
        ]);
        
        if (projectsRes.ok) {
          const projects = await projectsRes.json();
          setProjectsCount(projects.length);
        }
        
        if (configRes.ok) {
          const configData = await configRes.json();
          setConfig(configData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const updateConfigItem = (index: number, field: string, value: string) => {
    const newFeatured = [...config.featuredProjects];
    newFeatured[index] = { ...newFeatured[index], [field]: value };
    setConfig({ ...config, featuredProjects: newFeatured });
  };

  const handleSaveConfig = async () => {
    setSavingConfig(true);
    try {
      const res = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) alert("Landing page config updated!");
    } catch (err) {
      console.error(err);
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <div className="min-h-screen p-8 pt-20 relative bg-black text-white">
      {checkingAuth && (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin text-white" size={32} />
        </div>
      )}
      {!checkingAuth && user && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
              <h3 className="text-gray-400 text-sm font-bold uppercase mb-2">Total Projects</h3>
              <p className="text-4xl font-black">{projectsCount}</p>
            </div>
            {/* Add more stats if needed */}
          </div>

          <section className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold">Landing Page Featured Overlay</h3>
                <p className="text-gray-500 text-sm">Manage the 3 animated projects on your home page</p>
              </div>
              <button 
                onClick={handleSaveConfig}
                disabled={savingConfig}
                className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition disabled:opacity-50 flex items-center gap-2"
              >
                {savingConfig ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Update Landing
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.featuredProjects.map((item, i) => (
                <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-4">
                   <div className="text-xs font-bold text-gray-600 uppercase">Slot {i + 1}</div>
                   <div>
                     <label className="text-[10px] text-gray-500 uppercase mb-1 block font-bold">Title</label>
                     <input 
                       value={item.title}
                       onChange={(e) => updateConfigItem(i, "title", e.target.value)}
                       className="w-full bg-zinc-800 border border-white/10 rounded p-2 text-sm outline-none"
                     />
                   </div>
                   <div>
                     <label className="text-[10px] text-gray-500 uppercase mb-1 block font-bold">Image URL</label>
                     <input 
                       value={item.url}
                       onChange={(e) => updateConfigItem(i, "url", e.target.value)}
                       className="w-full bg-zinc-800 border border-white/10 rounded p-2 text-xs outline-none"
                     />
                   </div>
                   <div className="h-32 w-full overflow-hidden rounded-lg bg-black">
                     <img src={item.url} className="w-full h-full object-cover opacity-50" alt="" />
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
