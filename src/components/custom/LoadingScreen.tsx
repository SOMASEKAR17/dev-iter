"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingScreen({ isFinished }: { isFinished: boolean }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (isFinished) {
      const timeout = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(timeout)
    }
  }, [isFinished])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                x: [-100, 100, -100],
                y: [-50, 50, -50]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, -90, 0],
                x: [100, -100, 100],
                y: [50, -50, 50]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sky-500 rounded-full blur-[150px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo or Main Loader */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white font-exorts text-5xl md:text-9xl mb-8 italic"
            >
              S O M A S E K A R
            </motion.div>

            {/* Custom Progress Bar */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={isFinished ? { width: "100%" } : { width: ["0%", "80%"] }}
                transition={isFinished ? { duration: 0.5, ease: "easeInOut" } : { duration: 2, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
              />
            </div>

            {/* Status Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-white/40 text-xs tracking-[0.3em] uppercase font-zalando"
            >
              {isFinished ? "Ready to Explore" : "Synchronizing Experience"}
            </motion.div>
          </div>

          {/* Decorative Corner Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/20" 
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/20" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
