import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreateApiErr } from "../errors/customErr";
import { customReq } from "./dto/customReq";
import fs from "fs";
import { genToken } from "./authService";

// /api/v1/auth/forgetPassword    |   POST    |   public
export const forgetPassword = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) next(CreateApiErr("user not found", 404));

    const token = genToken(user?._id, "2m");

    const link = `${process.env.HOST}/auth/reset-password/${token}`;

    // sent link to user email
    let html = fs.readFileSync(
      `${__dirname}/../email-sender/templets/email-resetPassword.html`,
      "utf8"
    );
    
    html = html.replace("{{EMAIL}}", email);
    html = html.replace("{{LINK}}", link);

    // sendEmailService({ to: email, subject: "Reset Your Password", html });

    res.json({ msg: "check your email and email is valid 2m ^_^" });
  }
);

// send email to reset password
export const passwordReset = asyncHandler(
  async (req: customReq, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const { sub } = jwt.verify(
      token,
      String(process.env.JWT_KEY)
    ) as JwtPayload;

    const hash = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));

    console.log(hash);
    const updateUser = await User.updateOne(
      { _id: sub },
      {
        $set: { password: hash },
      }
    );

    res.json({ updateUser });
  }
);

// going to reset password by link from email
export const resetPage = asyncHandler(
  async (req: customReq, res: Response): Promise<void> => {
    const { token } = req.params;
    jwt.verify(token, String(process.env.JWT_KEY)) as JwtPayload;

    res.json({ resetLink: "reset password page" });
  }
);
