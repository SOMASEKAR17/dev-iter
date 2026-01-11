import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { user_name, user_email, subject, message } = body

    if (!user_name || !user_email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      )
    }


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })


    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: user_email,
      subject: `New Contact: ${subject}`,
      text: `
Name: ${user_name}
Email: ${user_email}
Subject: ${subject}
Message:
${message}
      `,
    })

    

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    )
  }
}
