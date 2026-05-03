"use client"

import { useRef,useState } from "react"
import { Mail, Linkedin, Twitter, Phone } from "lucide-react"
import { RiDiscordLine } from "react-icons/ri"

export default function ContactPage() {
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMsg("")

        const formData = new FormData(e.currentTarget)

        const payload = {
            user_name: formData.get("user_name"),
            user_email: formData.get("user_email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        }

        try {
            const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!res.ok || !data.success) {
            throw new Error("API failed")
            }

          
            setMsg("Message sent successfully!")
            formRef.current?.reset()   

        } catch (err) {
            console.error("Frontend error:", err)
            setMsg("Server error. Try again later.")
        } finally {
            setLoading(false)
        }
        }



  return (
    <main className="min-h-screen font-zalando bg-black text-white px-6 py-30">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-[10vw] font-bold font-exorts text-center">
          Contact Me
        </h1>
        <p className="text-center text-gray-400">
          Let’s build something amazing together.
        </p>

        {/* ---------------- FORM ---------------- */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-2xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <input
                name="user_name"
                required
                placeholder="Your name"
                className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3"
              />

              <input
                type="email"
                name="user_email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3"
              />

              <input
                name="subject"
                required
                placeholder="Project / Collaboration / Query"
                className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3"
              />

              <textarea
                rows={5}
                name="message"
                required
                placeholder="Tell me about your idea..."
                className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-zinc-600 py-3 font-semibold hover:bg-zinc-500 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {msg && (
              <p className="mt-4 text-center text-sm text-blue-400">
                {msg}
              </p>
            )}
          </div>
        </div>

        {/* socials stay same */}
         <div className="mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          <a href="https://discord.com/users/somasekarnaidu" target="_blank"
            className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover:bg-white/20 transition">
            <RiDiscordLine className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white transition" />
            <p className="mt-3 font-medium">Discord</p>
          </a>

          <a href="https://www.linkedin.com/in/somasekar-naidu-841646320/" target="_blank"
            className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover:bg-white/20 transition">
            <Linkedin className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white transition" />
            <p className="mt-3 font-medium">LinkedIn</p>
          </a>

          <a href="mailto:somasekarnaidu79@gmail.com"
            className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover:bg-white/20 transition">
            <Mail className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white transition" />
            <p className="mt-3 font-medium">Email</p>
          </a>

          <a href="https://x.com/NaiduSomasekar" target="_blank"
            className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover:bg-white/20 transition">
            <Twitter className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white transition" />
            <p className="mt-3 font-medium">Twitter</p>
          </a>

          <a href="tel:+919380648279"
            className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover:bg-white/20 transition">
            <Phone className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white transition" />
            <p className="mt-3 font-medium">Call Me</p>
          </a>

        </div>
      </div>
    </main>
  )
}
