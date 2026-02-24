const { PrismaClient } = require("./src/generated/client/index.js");
const prisma = new PrismaClient();

async function main() {
    try {
        const projects = await prisma.project.findMany();
        console.log("Projects:", projects);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
