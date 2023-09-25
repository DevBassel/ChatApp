import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { customReq } from "./dto/customReq";
import { CreateApiErr } from "../errors/customErr";

export default asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const token: string = req.cookies.auth;
    try {
      // check user login
      if (!token) next(CreateApiErr("Unauthorized", 401));

      // verify token
      const { sub } = jwt.verify(
        token,
        String(process.env.JWT_KEY)
      ) as JwtPayload;

      // get user
      const user = await User.findById(sub).select("-password");
      if (!user) next(CreateApiErr("User Not Found", 404));
      if (!user?.verify) next(CreateApiErr("Your Email Not Verifyed ", 401));

      // all done
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
);
