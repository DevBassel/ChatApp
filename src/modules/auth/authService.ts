import { NextFunction, Request, Response } from "express";
import { LoginDto, RegisterDto } from "./dto/authDto";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreateApiErr } from "../errors/customErr";
import { customReq } from "./dto/customReq";
import sendEmailService from "../emails/sendEmail.service";
import { readFileSync } from "fs";
import { join } from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const maxAge: number = 1000 * 60 * 60 * 24 * 30; // 30 day

// /api/v1/register    |   POST    |   public
export const register = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { email } = req.body as RegisterDto;

    // create verify code
    const code = genCode();

    const img = await cloudinary.uploader.upload(req.file.path, {
      quality: 10,
    });

    // save user in DB
    const user = await User.create({
      ...req.body,
      avatar: img.url,
      code,
    });

    if (!user) next(CreateApiErr("try again later"));

    sendCode(code, email, res);

    res.cookie("auth", genToken(user?._id), {
      // cookie is valid 30 days
      maxAge,
      httpOnly: true,
      secure: true,
    });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      verify: user.verify,
      avatar: user.avatar,
    });
  }
);

// verify email and create user
export const verifyEmail = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { email } = req.cookies;
    const { code } = req.body;
    console.log(code);

    // console.log(req.body);

    if (!email) next(CreateApiErr("code is expired go to login", 403));

    const user = await User.findOne({ email });

    if (user?.verify) return next(CreateApiErr("email is verifyed", 400));

    if (user?.code !== Number(code)) return next(CreateApiErr("bad data", 400));

    await User.updateOne(
      { _id: user?._id },
      {
        $set: { verify: true },
        $unset: { code },
      }
    );
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      verify: user.verify,
    });
  }
);

// /api/v1/login    |   POST    |   public
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginDto;

    if (!email || !password) return next(CreateApiErr("not valid data", 400));

    // get user
    let user = await User.findOne({ email });

    if (!user) return next(CreateApiErr("User Not Found", 404));

    if (!(await bcrypt.compare(password, String(user?.password))))
      return next(CreateApiErr("Email or password is wrong", 403));

    if (!user.verify) {
      // send code to verify email
      const code = genCode();

      sendCode(code, email, res);

      await User.updateOne(
        { email },
        {
          $set: { code },
        }
      );
      console.log(code);
    }

    // set cookie
    res.cookie("auth", genToken(user?._id), {
      // cookie is valid 30 days
      maxAge,
      httpOnly: true,
      secure: true,
    });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      verify: user.verify,
      avatar: user.avatar,
    });
  }
);

// /api/v1/auth/logout    |   POST    |   public
export const logout = asyncHandler(async (_, res: Response) => {
  res.clearCookie("auth");
  res.json({ msg: "loged out" });
});

export const genToken = (sub: any, expiresIn: string = "10d"): string => {
  return jwt.sign({ sub }, String(process.env.JWT_KEY), { expiresIn });
};

const sendCode = (code: number, email: string, res: Response): void => {
  let html = readFileSync(
    join(__dirname, "../emails/templets/verify-email.html"),
    "utf8"
  );

  // add email and cod in email templet
  html = html.replace("{{EMAIL}}", email);
  html = html.replace("{{CODE}}", String(code));

  // send  email
  sendEmailService({
    to: email,
    subject: "Verify Your Email ^_^ ",
    html,
  });

  res.cookie("email", email, {
    httpOnly: true,
    maxAge: 1000 * 60 * 2,
  });
};

// create code 6 nums
const genCode = () => Math.floor(Math.random() * 900000) + 100000;
