import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  sendResetOtp,
  resetPassword,
  uploadAvatar, // ✅ Add avatar upload controller (we’ll make it next)
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

// 🧩 Auth routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

// 👤 Profile route (protected)
userRouter.post("/profile", authUser, getUserProfile);

// 📸 Avatar upload route (protected)
userRouter.post("/upload-avatar", authUser, uploadAvatar); // ✅ new route

// 🔐 Password reset routes
userRouter.post("/send-reset-otp", sendResetOtp);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
