"use client"

import { getFirestore, collection, addDoc } from "firebase/firestore";
import {app} from "@/firebase";

const db = getFirestore(app);

await addDoc(collection(db, "users"), {
  name: "Somasekar",
  role: "developer"
});
