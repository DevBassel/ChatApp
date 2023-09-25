import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction } from "express";
import cookieParser from "cookie-parser";
import { dbConnect } from "./modules/config/DB.config";

import AuthRouter from "./modules/auth/authController";
import userRouter from "./modules/users/userController";
import chatRouter from "./modules/chat/chatController";

import auth from "./modules/auth/authMiddelware";
import ErrorMiddelware from "./modules/errors/ErrorMiddelware";
import cors from "cors";
import morgan from "morgan";
import { join, resolve } from "path";
import { createWriteStream } from "fs";

import { Server } from "socket.io";
import { createServer } from "http";
import chatSocket from "./modules/chat/chatSocket";
import { CreateApiErr } from "./modules/errors/customErr";

const PORT = process.env.PORT || 4000;
const baseUrl: string = "/api";

// socket config
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [String(process.env.CLIENT_URL), "http://localhost:3000"],
  },
});
chatSocket(io);

const accessLogStream = createWriteStream(join(__dirname, "../access.log"), {
  flags: "a",
});
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// Middelware
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [String(process.env.CLIENT_URL), "http://localhost:3000"],
    credentials: true,
  })
);
app.use("/api/uploads", express.static(join(__dirname, "..", "uploads")));

// Routs
app.use(`${baseUrl}/auth`, AuthRouter);
app.use(`${baseUrl}/users`, auth, userRouter);

// caht service
app.use(`${baseUrl}/chat`, auth, chatRouter);

app.use(express.static(join(__dirname, "..", "build")));
app.use("*", (_, res) => {
  res.sendFile(join(__dirname, "..", "build", "index.html"));
});

// Error handler
app.use(ErrorMiddelware);

// Start server
dbConnect(() => {
  server.listen(PORT, () => console.log(`live on http://localhost:${PORT}`));
});
