// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import multer from "multer";
import { uploadAvatar } from "./controllers/userController.js";
import authUser from "./middleware/authUser.js";

dotenv.config();

// Resolve ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ===================== Middleware =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configuration (Fixed for Render)
const allowedOrigins = [
  "http://localhost:3000", // local React dev
  "https://expence-tracker-2-dl1h.onrender.com", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight OPTIONS requests
app.options("*", cors());

// ✅ Serve uploaded files (like avatars)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===================== File Upload Setup =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads/avatars");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ===================== Routes =====================

// 👤 User routes
app.use("/api/user", userRouter);

// 📸 Avatar upload (protected)
app.post("/api/user/upload-avatar", authUser, upload.single("avatar"), uploadAvatar);

// 🧩 Dynamically load all other route files (if any)
const routesDir = path.join(__dirname, "routes");
for (const file of readdirSync(routesDir)) {
  if (!file.endsWith(".js") || file === "userRoutes.js") continue;
  const routeModule = await import(`./routes/${file}`);
  const router = routeModule.default || routeModule;
  app.use("/api/v1", router);
}

// ✅ Test endpoint
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker API is running successfully!");
});

// ===================== Server Setup =====================
const startServer = async () => {
  try {
    await db(); // Connect to MongoDB
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

// Only start the server outside of test mode
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export { app, startServer };
