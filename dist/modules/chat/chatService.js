"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatMsgs = exports.sendMsg = exports.getChats = exports.newChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Chat_1 = __importDefault(require("../models/Chat"));
const Msg_1 = __importDefault(require("../models/Msg"));
const customErr_1 = require("../errors/customErr");
const User_1 = __importDefault(require("../models/User"));
exports.newChat = (0, express_async_handler_1.default)(async (req, res, next) => {
    // chech chat if exist
    const checkChat = await Chat_1.default.findOne({
        $or: [
            {
                sender: req.user._id,
                reciver: req.body.recevierId,
            },
            {
                sender: req.body.recevierId,
                reciver: req.user._id,
            },
        ],
    });
    if (checkChat)
        return next((0, customErr_1.CreateApiErr)("chat is exist", 400));
    // chech user if exist
    const user = await User_1.default.findById(req.body.recevierId);
    if (!user)
        return next((0, customErr_1.CreateApiErr)("User Not Found", 404));
    const chat = await Chat_1.default.create({
        members: [req.user._id, req.body.recevierId],
        sender: req.user._id,
        reciver: req.body.recevierId,
    });
    res.json(chat);
});
exports.getChats = (0, express_async_handler_1.default)(async (req, res) => {
    const chats = await Chat_1.default.find({
        members: { $in: req.user._id },
    });
    res.json(chats);
});
exports.sendMsg = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { to, chatId, text } = req.body;
    const chat = await Chat_1.default.findById(chatId);
    // check users a members on this chat
    if (!chat ||
        (!chat.members.includes(to) && !chat.members.includes(req.user._id)))
        return next((0, customErr_1.CreateApiErr)("not valid data", 400));
    // create msg
    await Msg_1.default.create({ from: req.user._id, to, chatId, text });
    res.json({ success: true });
});
exports.getChatMsgs = (0, express_async_handler_1.default)(async (req, res) => {
    const msgs = await Msg_1.default.find({
        chatId: req.params.chatId,
    });
    res.json(msgs);
});
//# sourceMappingURL=chatService.js.map