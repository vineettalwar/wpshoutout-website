import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 2
  ) {
    res.status(400).json({ error: "Name is required (min 2 characters)." });
    return;
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }

  if (
    !message ||
    typeof message !== "string" ||
    message.trim().length < 10
  ) {
    res.status(400).json({ error: "Message must be at least 10 characters." });
    return;
  }

  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    res.status(503).json({ error: "Email service is not configured." });
    return;
  }

  const toEmail = process.env["CONTACT_EMAIL"] ?? "hello@wpshoutout.com";
  const fromEmail = process.env["CONTACT_FROM_EMAIL"] ?? "WP Shoutout Contact <noreply@wpshoutout.com>";

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email.trim(),
      subject: `New contact message from ${name.trim()}`,
      html: `
        <h2>New message from ${name.trim()}</h2>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message.trim()}</p>
      `,
      text: `New message from ${name.trim()}\n\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    });

    res.json({ success: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: `Failed to send message: ${errorMessage}` });
  }
});

export default router;
