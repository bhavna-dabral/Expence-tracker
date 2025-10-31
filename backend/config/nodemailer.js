import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Loaded" : "Missing");
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// Optional: verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP connection successful and ready to send mail!");
  }
});

export default transporter;
