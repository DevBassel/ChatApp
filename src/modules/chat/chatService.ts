import expressAsyncHandler from "express-async-handler";
import { customReq } from "../auth/dto/customReq";
import { NextFunction, Response } from "express";
import Chat from "../models/Chat";
import Msg from "../models/Msg";
import { CreateApiErr } from "../errors/customErr";
import User from "../models/User";

export const newChat = expressAsyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    // chech chat if exist
    const checkChat = await Chat.findOne({
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

    if (checkChat) return next(CreateApiErr("chat is exist", 400));

    // chech user if exist
    const user = await User.findById(req.body.recevierId);
    if (!user) return next(CreateApiErr("User Not Found", 404));

    const chat = await Chat.create({
      members: [req.user._id, req.body.recevierId],
      sender: req.user._id,
      reciver: req.body.recevierId,
    });

    res.json(chat);
  }
);

export const getChats = expressAsyncHandler(
  async (req: customReq, res: Response) => {
    const chats = await Chat.find({
      members: { $in: req.user._id },
    });

    res.json(chats);
  }
);

export const sendMsg = expressAsyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { to, chatId, text } = req.body;
    const chat = await Chat.findById(chatId);

    // check users a members on this chat
    if (
      !chat ||
      (!chat.members.includes(to) && !chat.members.includes(req.user._id))
    )
      return next(CreateApiErr("not valid data", 400));

    // create msg
    await Msg.create({ from: req.user._id, to, chatId, text });

    res.json({ success: true });
  }
);

export const getChatMsgs = expressAsyncHandler(
  async (req: customReq, res: Response) => {
    const msgs = await Msg.find({
      chatId: req.params.chatId,
    });

    res.json(msgs);
  }
);
