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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ===================== Middleware =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configuration (Handles local + Render)
const allowedOrigins = [
  "http://localhost:3000",
  "https://expence-tracker-1-idgb.onrender.com", // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Serve uploaded avatars & static files
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
app.use("/api/user", userRouter);

// 🧩 Avatar upload (protected)
app.post("/api/user/upload-avatar", authUser, upload.single("avatar"), uploadAvatar);

// 🧩 Dynamically import other route files (if any)
const routesDir = path.join(__dirname, "routes");
for (const file of readdirSync(routesDir)) {
  if (!file.endsWith(".js") || file === "userRoutes.js") continue;
  const routeModule = await import(`./routes/${file}`);
  const router = routeModule.default || routeModule;
  app.use("/api/v1", router);
}

// ===================== Server Setup =====================
const tryListen = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port);
    const onError = (err) => {
      server.removeListener("listening", onListening);
      reject(err);
    };
    const onListening = () => {
      server.removeListener("error", onError);
      resolve(server);
    };
    server.once("error", onError);
    server.once("listening", onListening);
  });

const startServer = async () => {
  await db();

  let port = Number(PORT);
  const maxAttempts = 5;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const server = await tryListen(port);
      console.log(`✅ Server running on port ${port}`);
      return server;
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
        port++;
        continue;
      }
      console.error("❌ Failed to start server", err);
      process.exit(1);
    }
  }
  console.error("❌ Unable to bind to a port after multiple attempts");
  process.exit(1);
};

// Only start server outside of test mode
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export { app, startServer };
