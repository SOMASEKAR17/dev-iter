"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase";

const auth = getAuth(app);

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [projectsCount, setProjectsCount] = useState<number>(0);
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
        setProjectsCount(data.length);
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen p-8 pt-20 relative bg-black text-white">
      {checkingAuth && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      )}
      {!checkingAuth && user && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium">Projects</h3>
              <p >{projectsCount} Total</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
