import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  // STEP 1 — Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/send-reset-otp`, { email });
      if (data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // STEP 2 — Verify OTP + reset password
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={2000} />
      <div style={styles.card}>
        <h2 style={styles.title}>{step === 1 ? "Forgot Password" : "Reset Password"}</h2>
        <p style={styles.subtitle}>
          {step === 1
            ? "Enter your registered email to receive an OTP."
            : "Enter the OTP sent to your email and set a new password."}
        </p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} style={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" style={styles.buttonPrimary}>
              Send OTP
            </button>
            <p style={styles.link} onClick={() => navigate("/login")}>
              Back to Login
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={styles.form}>
            <input
              type="text"
              placeholder="Enter OTP"
              style={styles.input}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              style={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" style={styles.buttonSuccess}>
              Reset Password
            </button>
            <p style={styles.link} onClick={() => setStep(1)}>
              Resend OTP
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

// ✅ CSS Styles (matches your project palette)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100git add .vh",
    background: "linear-gradient(to right, #f0f4ff, #e4ecfa)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    textAlign: "center",
    animation: "fadeIn 0.6s ease-in-out",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  buttonPrimary: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 0",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  buttonSuccess: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "10px 0",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "10px",
  },
};

export default ResetPassword;
