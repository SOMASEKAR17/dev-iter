"use client"

import FlowingMenu from "@/components/reactBites/flowingMenue"
import  { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Page = () => {

  const pathname = usePathname();

  /* ---------------- LANGUAGES ---------------- */
  const languagesItems = [
    { link: "#", text: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { link: "#", text: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { link: "#", text: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { link: "#", text: "C", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { link: "#", text: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { link: "#", text: "Go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  ]

  /* ---------------- WEB DEV ---------------- */
  const webDevItems = [
    { link: "#", text: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { link: "#", text: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { link: "#", text: "Tailwind CSS", image: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { link: "#", text: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { link: "#", text: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { link: "#", text: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { link: "#", text: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { link: "#", text: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ]

  /* ---------------- AI / ML ---------------- */
  const aiMlItems = [
    { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { link: "#", text: "NumPy", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { link: "#", text: "Pandas", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { link: "#", text: "Scikit-learn", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
    { link: "#", text: "TensorFlow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { link: "#", text: "PyTorch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { link: "#", text: "OpenAI APIs", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { link: "#", text: "LangChain", image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
  ]

 

  return (
    <div className="min-h-screen  pt-30 pb-20   px-6 space-y-0">

      <div className="grid-cols-1 grid md:grid-cols-2 mx-auto relative gap-10 max-w-350">
        {/* ---------------- LANGUAGES ---------------- */}
        <section className="relative border rounded-4xl">
          <motion.h1
            key={pathname}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay:0.25
            }}
        
          className="text-[20vw] sm:text-[10vw] text-center font-exorts text-white lg:-mb-10">
            Languages
          </motion.h1>
          <div  className="h-[80vw] rounded-4xl sm:h-[60vw] md:h-[47vw] lg:h-[40vw] xl:h-[35vw]" style={{  position: "relative" }}>
            <FlowingMenu marqueeTextColor={"#aaaeb5"} marqueeBgColor={"#393e47"} items={languagesItems} />
          </div>
        </section>
        {/* ---------------- WEB DEV ---------------- */}
        <section className="relative border rounded-4xl">
          <motion.h1
            key={pathname}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay:0.25
            }}
            className="text-[20vw] sm:text-[10vw] text-center font-exorts text-white lg:-mb-10"
          >
            Web Development
          </motion.h1>
          <div className="h-[90vw] sm:h-[65vw] md:h-[47vw] lg:h-[40vw] xl:h-[35vw]"  style={{  position: "relative" }}>
            <FlowingMenu marqueeTextColor={"#aaaeb5"} marqueeBgColor={"#393e47"} items={webDevItems} />
          </div>
        </section>
        {/* ---------------- AI / ML ---------------- */}
        <section className="relative overflow-hidden border rounded-4xl">
          <motion.h1
            key={pathname}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay:0.25
            }}
            className="text-[20vw] sm:text-[10vw] text-center font-exorts text-white lg:-mb-10"
          >
            AI / Machine Learning
          </motion.h1>
          <div className="h-[90vw] sm:h-[60vw] md:h-[45vw] lg:h-[40vw] xl:h-[35vw]"  style={{  position: "relative" }}>
            <FlowingMenu marqueeTextColor={"#aaaeb5"} marqueeBgColor={"#393e47"} items={aiMlItems} />
          </div>
        </section>
      </div>

    </div>
  )
}

export default Page
