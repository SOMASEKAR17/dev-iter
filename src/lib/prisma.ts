import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({
        connectionString,
        ssl: connectionString?.includes("sslmode=require") ? { rejectUnauthorized: false } : false
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};

declare global {
    var prisma_v3: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Check for schema staleness
const staleCheck = () => {
    const existing = globalThis.prisma_v3;
    if (!existing) return true;

    // Check if new model or new field exists in the current instance
    // @ts-ignore
    const isStale = !existing.timelineItem || !existing.project || !existing.customPage;
    if (isStale) return true;

    return false;
}

if (staleCheck()) {
    globalThis.prisma_v3 = undefined;
}

const prisma = globalThis.prisma_v3 ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma_v3 = prisma;
