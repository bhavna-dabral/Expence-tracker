import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  sendResetOtp,
  resetPassword,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js"; // ✅ fixed import

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/profile", authUser, getUserProfile);
userRouter.post("/send-reset-otp", sendResetOtp);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
