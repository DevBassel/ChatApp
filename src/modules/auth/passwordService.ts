import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreateApiErr } from "../errors/customErr";
import { customReq } from "./dto/customReq";
import { readFileSync } from "fs";
import { genToken } from "./authService";
import sendEmailService from "../emails/sendEmail.service";
import { join } from "path";

// /api/auth/forgetPassword    |   POST    |   public
export const forgetPassword = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) next(CreateApiErr("user not found", 404));

    const token = genToken(user?._id, "5m");

    const link = `${process.env.HOST}/reset-password/${token}`;

    // sent link to user email
    let html = readFileSync(
      join(__dirname, "../emails/templets/email-resetPassword.html"),
      "utf8"
    );

    html = html.replace("{{EMAIL}}", email);
    html = html.replace("{{LINK}}", link);

    sendEmailService({ to: email, subject: "Reset Your Password", html });

    res.json({ success: true });
  }
);

// send email to reset password
export const passwordReset = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const { sub } = jwt.verify(
      token,
      String(process.env.JWT_KEY)
    ) as JwtPayload;

    const hash = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));

    const upd = await User.updateOne(
      { _id: sub },
      {
        $set: { password: hash },
      }
    );
    console.log(upd);
    res.json({ success: true });
  }
);
