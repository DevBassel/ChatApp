"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const DB_config_1 = require("./modules/config/DB.config");
const authController_1 = __importDefault(require("./modules/auth/authController"));
const userController_1 = __importDefault(require("./modules/users/userController"));
const chatController_1 = __importDefault(require("./modules/chat/chatController"));
const authMiddelware_1 = __importDefault(require("./modules/auth/authMiddelware"));
const ErrorMiddelware_1 = __importDefault(require("./modules/errors/ErrorMiddelware"));
//import cors from "cors";
const morgan_1 = __importDefault(require("morgan"));
const path_1 = require("path");
const fs_1 = require("fs");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const chatSocket_1 = __importDefault(require("./modules/chat/chatSocket"));
const PORT = process.env.PORT || 4000;
const baseUrl = "/api";
// socket config
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
(0, chatSocket_1.default)(io);
const accessLogStream = (0, fs_1.createWriteStream)((0, path_1.join)(__dirname, "../access.log"), {
    flags: "a",
});
// setup the logger
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
// Middelware
app.use(express_1.default.json({ limit: "20kb" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: [String(process.env.CLIENT_URL), "http://localhost:3000"],
//     credentials: true,
//   })
// );
app.use("/api/uploads", express_1.default.static((0, path_1.join)(__dirname, "..", "uploads")));
// Routs
app.use(`${baseUrl}/auth`, authController_1.default);
app.use(`${baseUrl}/users`, authMiddelware_1.default, userController_1.default);
// caht service
app.use(`${baseUrl}/chat`, authMiddelware_1.default, chatController_1.default);
app.use(express_1.default.static((0, path_1.join)(__dirname, "../client", "build")));
app.use("*", (_, res) => {
    res.sendFile((0, path_1.join)(__dirname, "../client", "build", "index.html"));
});
// Error handler
app.use(ErrorMiddelware_1.default);
// Start server
(0, DB_config_1.dbConnect)(() => {
    server.listen(PORT, () => console.log(`live on http://localhost:${PORT}`));
});
//# sourceMappingURL=index.js.map