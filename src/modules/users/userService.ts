import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import { customReq } from "../auth/dto/customReq";
import User from "../models/User";
import { userDto } from "./dto/userDto";
import { CreateApiErr } from "../errors/customErr";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { compareSync } from "bcrypt";

// /api/ profile    |   GET    |   private
export const profile = asyncHandler(async (req: customReq, res: Response) => {
  res.json(req.user);
});

// /api/ allUsers    |   GET    |   private
export const getAllUsers = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const users: userDto | unknown = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password -__v");

    res.json(users);
  }
);

// /api/ users/:id    |   GET    |   private
export const getUserById = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return next(CreateApiErr("not valid id ", 400));

    const user: userDto | unknown = await User.findById(id).select("-password");

    if (!user) return next(CreateApiErr("User Not Found ", 404));

    res.json(user);
  }
);

// /api/ users/:id    |   DELETE    |   private
export const deleteUser = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (isValidObjectId(id)) return next(CreateApiErr("Not valid id", 400));

    if (req.user.rule !== "admin" || String(req.user._id) !== id)
      return next(CreateApiErr("don't have an access", 401));

    const user = await User.findByIdAndDelete(id);

    if (!user) return next(CreateApiErr("Not Found", 404));

    res.json({ success: true });
  }
);

// /api/ users/:id    |   PUT    |   private
export const updateUser = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { _id } = req.user;
    const { name, password } = req.body;
    if (String(_id) !== String(req.user._id))
      return next(CreateApiErr("don't have an access", 401));

    const user = await User.findById(_id);

    if (!user) return next(CreateApiErr("User Not Found", 404));

    if (!compareSync(password, String(user.password)))
      return next(CreateApiErr("Unauthorized", 401));
    if (req.file) {
      const img = await cloudinary.uploader.upload(req.file.path, {
        quality: 10,
      });
      await User.updateOne({ _id }, { $set: { name, avatar: img.url } });
    }

    await User.updateOne({ _id }, { $set: { name } });

    res.json({ success: true });
  }
);
