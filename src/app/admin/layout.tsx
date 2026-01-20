"use client"

import Navbar from "@/components/AdminComponents/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}