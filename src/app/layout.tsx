import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/navbar"
import Footer from "@/components/footer";
import { Icon } from "lucide-react";
import { Analytics } from "@vercel/analytics/next"
import {ReactLenis} from "@/lib/lenis"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Somasekar Naidu",
  description: "Portfolio website of somasekar naidu L , 2nd year BTech student at vit vellore",
  icons:{
    icon:["https://res.cloudinary.com/di97k34d0/image/upload/v1768295434/1768244598036_1_o04o5m.jpg","https://media.licdn.com/dms/image/v2/D4E03AQHn_xqbRyB6_w/profile-displayphoto-scale_200_200/B4EZkm93z0GoAY-/0/1757295380467?e=1769644800&v=beta&t=OAv2b1IeMHSVJHYIHHVn1G7rNtIahOGHNGao6WgHbSc"]
   
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
          <Navbar />
          {children}
          <Footer />

      </body>
      </ReactLenis>
    </html>
  );
}
