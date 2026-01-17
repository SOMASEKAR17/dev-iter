"use client";

import { signInWithGoogle } from "@/firebase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";


const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Logged in:", user.email);
      router.push("/admin");
    } catch (err: any) {
      alert(err.message || "Login failed");   // replace it with toast
    }
  };

  return (
    <div className="h-screen fixed w-full top-0 left-0 flex items-center justify-center bg-black/90">
      <div className="w-full max-w-sm bg-zinc-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-zinc-400 text-center mb-6">
          Only authorized Google account allowed
        </p>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-medium hover:bg-zinc-200 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
