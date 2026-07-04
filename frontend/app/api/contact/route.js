import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipientEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;

if (!recipientEmail || !smtpUser || !smtpPass || !smtpHost) {
  console.warn(
    "Missing required email environment variables: CONTACT_EMAIL, SMTP_USER, SMTP_PASS, SMTP_HOST"
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body?.name?.trim();
    const email = body?.email?.trim();
    const subject = body?.subject?.trim();
    const message = body?.message?.trim();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!recipientEmail || !smtpUser || !smtpPass || !smtpHost) {
      return new Response(
        JSON.stringify({ error: "Email delivery is not configured yet." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${smtpUser}>`,
      replyTo: `${name} <${email}>`,
      to: recipientEmail,
      subject: `Portfolio contact form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact form error:", error);

    const message =
      error?.code === "EAUTH" || error?.responseCode === 535
        ? "Gmail rejected the SMTP credentials. Please use a valid Gmail app password for SMTP_PASS."
        : "Unable to send your message right now.";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
