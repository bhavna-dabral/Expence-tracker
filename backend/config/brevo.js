// backend/config/brevo.js
import * as brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();

// ✅ Correct way to set API key for Brevo SDK
apiInstance.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const senderEmail = process.env.SENDER_EMAIL || "no-reply@example.com";

    const sendSmtpEmail = {
      sender: { email: senderEmail, name: "Forever App" },
      to: [{ email: to }],
      subject,
      htmlContent,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log(`✅ Email sent to: ${to}`);
    console.log("📨 Brevo response:", response?.messageId || response);
    return response;
  } catch (error) {
    console.error("❌ Email send failed:");
    console.error(error?.response?.body || error.message || error);
    throw error;
  }
};
