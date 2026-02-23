import { getDatabase } from "firebase/database";
import { app } from "../Config/firebase.config";

export const db = getDatabase(app);
