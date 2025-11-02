import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Optional logging for debugging
console.log("📧 Using Brevo SMTP configuration");
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // Brevo uses STARTTLS on port 587
  auth: {
    user: process.env.SMTP_USER, // Your Brevo login email
    pass: process.env.SMTP_PASS, // Your generated SMTP key (not API key)
  },
  tls: {
    rejectUnauthorized: false, // helps avoid certificate issues on some hosts
  },
  connectionTimeout: 20000, // 20s to handle Render slow cold starts
});

// Verify connection on startup (optional, but useful)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error.message);
    if (error.code === "ETIMEDOUT") {
      console.log(
        "⏳ Connection timed out — Render may block SMTP ports (587/465). Try using Brevo API instead."
      );
    }
  } else {
    console.log("✅ SMTP connection successful! Ready to send emails.");
  }
});

export default transporter;
