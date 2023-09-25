import express from "express";
import { getChatMsgs, getChats, newChat, sendMsg } from "./chatService";

const router = express.Router();

router.route("/").post(newChat).get(getChats);

router.post("/msg", sendMsg);
router.get("/msg/:chatId", getChatMsgs);

export default router;
