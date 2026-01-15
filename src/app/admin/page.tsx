"use client"

import { useEffect, useState } from "react";



export default  function AdminPage() {

  const [projectsCount,SetProjectsCout] = useState<number>(0);
  
  useEffect(()=>{

    async function getProjectsCount() {
      const res = await fetch(`/api/projects`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await res.json();
      SetProjectsCout(data.length)
    }

    getProjectsCount();
    
    
  },[])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Projects</h3>
          <p className="text-gray-500">{projectsCount} Total</p>
        </div>
      </div>
    </div>
  );
}
