import { Resend } from "resend"

export const runtime = "nodejs"

interface SendEmailBody {
  recipients?: string
  subject?: string
  content?: string
}

function parseRecipients(raw: string): string[] {
  return raw
    .split(/[\n,;]+/)
    .map((value) => value.trim())
    .filter(Boolean)
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: "Email is not configured. Add RESEND_API_KEY to your project." },
      { status: 500 },
    )
  }

  let body: SendEmailBody
  try {
    body = (await request.json()) as SendEmailBody
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 })
  }

  const content = body.content?.trim()
  if (!content) {
    return Response.json({ error: "Email content is required." }, { status: 400 })
  }

  const recipients = parseRecipients(body.recipients ?? "")
  if (recipients.length === 0) {
    return Response.json({ error: "Add at least one recipient email address." }, { status: 400 })
  }

  const invalid = recipients.filter((email) => !EMAIL_PATTERN.test(email))
  if (invalid.length > 0) {
    return Response.json({ error: `Invalid email address: ${invalid.join(", ")}` }, { status: 400 })
  }

  const subject = body.subject?.trim() || "A new update from AUTOWAY"

  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from: "AUTOWAY <onboarding@resend.dev>",
    to: recipients,
    subject,
    text: content,
  })

  if (error) {
    return Response.json({ error: error.message || "Failed to send email." }, { status: 502 })
  }

  return Response.json({ id: data?.id, delivered: recipients.length })
}
