import { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  logout,
  reSendValidEmail,
} from "./authService";
import { forgetPassword, passwordReset } from "./passwordService";
import upload from "../middlewares/upload";

// /api/v1/auth

const router = Router();

router.post("/register", upload.single("avatar"), register);

router.post("/verify", verifyEmail);

router.post("/reSendCode", reSendValidEmail);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forget-password", forgetPassword);

router.route("/reset-password/:token").post(passwordReset);

export default router;
