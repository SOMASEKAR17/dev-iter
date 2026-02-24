"use client"

import Navbar from "@/components/AdminComponents/navbar";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <Navbar />
      <main className="flex-1 lg:pl-64">
        {children}
      </main>
    </div>
  );
}