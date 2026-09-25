import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { recipients, subject, content } = (await req.json()) as {
      recipients?: string
      subject?: string
      content?: string
    }

    const user = process.env.EMAIL_USER?.trim()
    // Gmail App Passwords are shown with spaces (e.g. "abcd efgh ijkl mnop") but must be used without them
    const pass = process.env.EMAIL_PASS?.replace(/\s+/g, "")

    if (!user || !pass) {
      return NextResponse.json(
        { error: "Email is not configured. Add EMAIL_USER and EMAIL_PASS environment variables." },
        { status: 500 },
      )
    }

    const to = (recipients ?? "")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)

    if (to.length === 0) {
      return NextResponse.json({ error: "Add at least one recipient email address." }, { status: 400 })
    }

    if (!content?.trim()) {
      return NextResponse.json({ error: "Email content cannot be empty." }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `AUTOWAY <${user}>`,
      to,
      subject: subject?.trim() || "A new update from AUTOWAY",
      html: `<p>${content.replace(/\n/g, "<br/>")}</p>`,
    })

    return NextResponse.json({ success: true, delivered: to.length })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
