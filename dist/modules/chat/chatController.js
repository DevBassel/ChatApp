"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatService_1 = require("./chatService");
const router = express_1.default.Router();
router.route("/").post(chatService_1.newChat).get(chatService_1.getChats);
router.post("/msg", chatService_1.sendMsg);
router.get("/msg/:chatId", chatService_1.getChatMsgs);
exports.default = router;
//# sourceMappingURL=chatController.js.map