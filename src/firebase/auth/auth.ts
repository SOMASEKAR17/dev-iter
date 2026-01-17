"use client"

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "@/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const allowedEmail = process.env.NEXT_PUBLIC_ALLOWED_EMAIL;

    if (!user.email || user.email !== allowedEmail) {
      await signOut(auth);
      throw new Error("Unauthorized email");
    }

    return user;
  } catch (error) {
    throw error;
  }
};
