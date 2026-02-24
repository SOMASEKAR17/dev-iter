import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

const DEFAULT_PROJECTS = [
    {
        "id": "p1",
        "createdAt": "2025-09-24",
        "title": "crowder.ai",
        "link": {
            "linkedIn": "https://www.linkedin.com/posts/somasekar-naidu-841646320_hackathon-productvalidation-webdev-activity-7416803731318554624-LC0M",
            "Github": "https://github.com/SOMASEKAR17/Crowder"
        },
        "description": "An AI-powered idea validation platform that evaluates how people may respond to a product or concept. It simulates audience reactions, analyzes sentiment, and predicts engagement levels to help founders and teams make better decisions before launch.",
        "techstack": {
            "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "AI/ML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
            "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
        },
        "gallery": [
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_201642_sej9ra.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_203235_kfkhnk.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_202957_fhkl97.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238806/Screenshot_2026-01-12_203307_maxfgi.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238801/Screenshot_2026-01-12_201652_cetdpu.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238801/Screenshot_2026-01-12_203131_pr48ab.png"
        ]
    }, {
        "id": "p2",
        "createdAt": "2025-04-17",
        "title": "FintechX – AI-Powered Finance Management Platform",
        "link": {
            "linkedIn": "https://www.linkedin.com/posts/somasekar-naidu-841646320_hackathon-fintech-ai-activity-7318672541546418177-6CaY",
            "Github": "https://github.com/SOMASEKAR17/fintech-x"
        },
        "description": "FintechX is a smart finance management platform that helps users track expenses, manage investments, and plan savings using AI-driven insights. The system analyzes spending patterns, provides personalized financial suggestions, and presents data through clean, interactive dashboards for better decision-making.",
        "techstack": {
            "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
            "AI/ML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
        },
        "gallery": [
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_222702_ck1dki.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238802/Screenshot_2026-01-12_222729_g2gdme.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238801/Screenshot_2026-01-12_222746_y9y52w.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238804/Screenshot_2026-01-12_222800_qtswov.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238802/Screenshot_2026-01-12_222812_rlz9ys.png"
        ]
    }, {
        "id": "p3",
        "createdAt": "2025-05-31",
        "title": "iPhone 15 Flagship Product Page Clone",
        "link": { "Github": "#", "linkedIn": "" },
        "description": "A visually rich clone of Apple’s iPhone 15 product page featuring smooth carousels, premium UI animations, and an interactive 3D product viewer. The project recreates the flagship Apple experience with fluid transitions, responsive design, and immersive product exploration.",
        "techstack": {
            "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
            "GSAP": "https://api.iconify.design/logos:greensock.svg",
            "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
        },
        "gallery": [
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238817/Screenshot_2026-01-12_224004_pftirp.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238818/Screenshot_2026-01-12_224016_f8aur8.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238818/Screenshot_2026-01-12_224033_stgpy0.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238819/Screenshot_2026-01-12_224045_dpkwvc.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238823/Screenshot_2026-01-12_224102_lndwup.png"
        ]
    },
    {
        "id": "p4",
        "createdAt": "2025-07-05",
        "title": "GoldLend Pro – ERP for Gold Loan Management",
        "link": { "Github": "https://github.com/SOMASEKAR17/goldLending-ERP", "linkedIn": "" },
        "description": "A full-featured ERP application built to manage gold loan operations. It helps admins handle customers, loans, payments, operators, and reports from a single dashboard, improving efficiency and reducing manual work in lending businesses.",
        "techstack": {
            "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
            "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
            "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
        },
        "gallery": [
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238815/Screenshot_2026-01-12_215242_yhlvj2.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238814/Screenshot_2026-01-12_220813_bv3axm.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238815/Screenshot_2026-01-12_220828_rwq2t8.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238815/Screenshot_2026-01-12_220846_ehlbw5.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238815/Screenshot_2026-01-12_220906_m53p8w.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238815/Screenshot_2026-01-12_220920_agcsdh.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238816/Screenshot_2026-01-12_220933_tqhq7i.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238816/Screenshot_2026-01-12_220948_limmqg.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238816/Screenshot_2026-01-12_221019_sonobo.png"
        ]
    },
    {
        "id": "p5",
        "createdAt": "2025-08-12",
        "title": "GenReal.ai – AI Security Platform (Internship Project)",
        "link": { "Github": "https://github.com/SOMASEKAR17/GenReal.ai_main", "linkedIn": "" },
        "description": "Worked as an intern at GenReal.ai, contributing to the development of an AI-powered deepfake detection platform. Built interactive dashboards that display deepfake probability, model confidence, and real-time processing insights, helping improve digital trust and online security.",
        "techstack": {
            "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
            "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "AI/ML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
            "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
        },
        "gallery": [
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238810/Screenshot_2026-01-12_203637_qj96vy.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238814/Screenshot_2026-01-12_203657_s43ai4.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238811/Screenshot_2026-01-12_203725_lrxkfz.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238812/Screenshot_2026-01-12_203735_oxmjty.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238812/Screenshot_2026-01-12_203746_hyr8wc.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238813/Screenshot_2026-01-12_203755_ailgeb.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238817/Screenshot_2026-01-12_203806_hipfpw.png"
        ]
    },
    {
        "id": "p6",
        "createdAt": "2025-11-02",
        "title": "Ecommerce Product Explorer",
        "link": { "Github": "https://github.com/SOMASEKAR17/ecommerce", "linkedIn": "" },
        "description": "A simple frontend eCommerce website that allows users to browse products, filter them by category and price, and view product details. This project was built as a CodeChef requirement task to demonstrate API integration and modern frontend development skills.",
        "techstack": {
            "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
            "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
            "REST API": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        },
        "gallery": [
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238810/Screenshot_2026-01-12_200817_sefjvo.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238806/Screenshot_2026-01-12_200912_ig9ny5.png",
            "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_200937_vlaaiu.png"
        ]
    }
];

const DEFAULT_SKILLS = {
    languages: [
        { link: "#", text: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { link: "#", text: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { link: "#", text: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { link: "#", text: "C", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { link: "#", text: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { link: "#", text: "Go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    ],
    webDev: [
        { link: "#", text: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { link: "#", text: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { link: "#", text: "Tailwind CSS", image: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
        { link: "#", text: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { link: "#", text: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { link: "#", text: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { link: "#", text: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { link: "#", text: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    ],
    aiMl: [
        { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { link: "#", text: "NumPy", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { link: "#", text: "Pandas", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { link: "#", text: "Scikit-learn", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
        { link: "#", text: "TensorFlow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { link: "#", text: "PyTorch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { link: "#", text: "OpenAI APIs", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
        { link: "#", text: "LangChain", image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    ],
    cloud: [
        { link: "#", text: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { link: "#", text: "Vercel", image: "https://cdn.simpleicons.org/vercel/FFFFFF" },
        { link: "#", text: "AWS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
        { link: "#", text: "Google Cloud", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { link: "#", text: "Firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
        { link: "#", text: "GitHub Actions", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ]
}


const DEFAULT_CONFIG = {
    featuredProjects: [
        { id: "1", title: "CROWDER.AI", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_201642_sej9ra.png" },
        { id: "2", title: "FINTECH-X", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_222702_ck1dki.png" },
        { id: "3", title: "GENREAL.AI", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238810/Screenshot_2026-01-12_203637_qj96vy.png" }
    ]
}

const DEFAULT_TIMELINE = [
    {
        date: "Nov 2024",
        title: "Runner-Up – Python API Hackathon",
        type: "hackathon",
        desc: "Secured Runner-Up position at the MIDAS Python API Hackathon by building API-based automation tools that improved integration and efficiency in civil engineering software systems.",
        order: 0
    },
    {
        date: "Apr 2025",
        title: "1st Runner-Up – CodeDoc 2.0 Hackathon",
        type: "hackathon",
        desc: "Won 1st Runner-Up at the IEEE PES CodeDoc 2.0 Hackathon by developing a full-stack financial management platform with interactive analytics and real-time investment insights.",
        order: 1
    },
    {
        date: "May 2025",
        title: "FintechX – Full Stack Project",
        type: "project",
        desc: "Built a full-stack financial management platform with EMI/SIP calculators, real-time financial news, and an AI-powered chatbot using React, Node.js, Express, MongoDB, and Flask with secure JWT-based authentication.",
        order: 2
    },
    {
        date: "May – Aug 2025",
        title: "GenReal AI – Frontend Developer Intern",
        type: "internship",
        desc: "Worked as a Frontend Developer Intern, building scalable UI systems using React, Tailwind CSS, and GSAP. Improved performance with lazy loading, code splitting, and modular component architecture.",
        order: 3
    },
    {
        date: "Aug 2025",
        title: "Rental Price Prediction – ML Project",
        type: "project",
        desc: "Developed a machine learning model to predict rental prices using historical housing data, applying feature engineering and regression techniques with Python and Scikit-Learn.",
        order: 4
    },
    {
        date: "Sep 2025",
        title: "Crowder.AI – AI Simulation Platform",
        type: "project",
        desc: "Built an AI-driven project simulation platform with real-time 3D visualization using Three.js. Optimized frontend performance and synchronization, reducing load times by 40%.",
        order: 5
    },
    {
        date: "Nov 2025 – Present",
        title: "CodeChef VIT – Senior Core Member",
        type: "club",
        desc: "Serving as a Senior Core Member and Full Stack Web Developer, contributing to large-scale platforms used by thousands of students while mentoring juniors and supporting major technical events.",
        order: 6
    },
]

export async function GET() {
    try {
        // 1. Migrate Projects
        for (const p of DEFAULT_PROJECTS) {
            await prisma.project.upsert({
                where: { id: p.id },
                update: p,
                create: p
            });
        }

        // 2. Migrate Skills
        for (const [category, items] of Object.entries(DEFAULT_SKILLS)) {
            await prisma.skillCategory.upsert({
                where: { id: category },
                update: { items: { items } },
                create: { id: category, items: { items } }
            });
        }

        // 3. Migrate Config
        await prisma.config.upsert({
            where: { id: "landing" },
            update: { content: DEFAULT_CONFIG },
            create: { id: "landing", content: DEFAULT_CONFIG }
        });

        // 4. Migrate Timeline
        for (const item of DEFAULT_TIMELINE) {
            await prisma.timelineItem.upsert({
                where: { id: item.title.substring(0, 10).replace(/\s/g, '') }, // temporary id for migration
                update: item,
                create: { ...item, id: item.title.substring(0, 10).replace(/\s/g, '') }
            });
        }

        return NextResponse.json({ success: true, message: "Prisma migration successful" })
    } catch (error: any) {
        console.error("Migration error:", error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
