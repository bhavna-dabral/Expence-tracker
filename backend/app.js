// app.js

import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db/db.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middlewares =====
app.use(express.json());
app.use(cors());

// ===== Routes =====
app.use('/api/user', userRouter);

// Dynamically load all route files in /routes
const routesDir = path.join(__dirname, 'routes');
for (const file of readdirSync(routesDir)) {
  if (!file.endsWith('.js')) continue;
  const routeModule = await import(`./routes/${file}`);
  const router = routeModule.default || routeModule;
  app.use('/api/v1', router);
}

// ===== Server Setup =====
const tryListen = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port);
    const onError = (err) => {
      server.removeListener('listening', onListening);
      reject(err);
    };
    const onListening = () => {
      server.removeListener('error', onError);
      resolve(server);
    };
    server.once('error', onError);
    server.once('listening', onListening);
  });
};

const startServer = async () => {
  await db();
  let port = Number(PORT);
  const maxAttempts = 5;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const server = await tryListen(port);
      console.log(`✅ Server listening on port ${port}`);
      server.on('error', (err) => {
        console.error('Server error', err);
        process.exit(1);
      });
      return server;
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${port} in use, trying ${port + 1}...`);
        port++;
        continue;
      }
      console.error('❌ Failed to start server', err);
      process.exit(1);
    }
  }
  console.error('❌ Unable to bind to a port after multiple attempts');
  process.exit(1);
};

// ===== Start the server (unless testing) =====
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export { app, startServer };
