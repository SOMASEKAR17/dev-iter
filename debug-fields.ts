import prisma from "./src/lib/prisma";

async function test() {
    try {
        // @ts-ignore
        console.log("DMMF Models:", JSON.stringify(prisma._dmmf.modelMap.Project.fields.map(f => f.name)));
    } catch (e) {
        console.log("Error accessing DMMF", e);
    }
    process.exit(0);
}

test();
