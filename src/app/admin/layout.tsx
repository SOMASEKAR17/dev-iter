"use client"

import Navbar from "@/components/AdminComponents/navbar";
import Script from "next/script";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}