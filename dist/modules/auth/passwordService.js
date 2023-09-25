"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPage = exports.passwordReset = exports.forgetPassword = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customErr_1 = require("../errors/customErr");
const fs_1 = __importDefault(require("fs"));
const authService_1 = require("./authService");
// /api/v1/auth/forgetPassword    |   POST    |   public
exports.forgetPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user)
        next((0, customErr_1.CreateApiErr)("user not found", 404));
    const token = (0, authService_1.genToken)(user?._id, "2m");
    const link = `${process.env.HOST}/auth/reset-password/${token}`;
    // sent link to user email
    let html = fs_1.default.readFileSync(`${__dirname}/../email-sender/templets/email-resetPassword.html`, "utf8");
    html = html.replace("{{EMAIL}}", email);
    html = html.replace("{{LINK}}", link);
    // sendEmailService({ to: email, subject: "Reset Your Password", html });
    res.json({ msg: "check your email and email is valid 2m ^_^" });
});
// send email to reset password
exports.passwordReset = (0, express_async_handler_1.default)(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    const { sub } = jsonwebtoken_1.default.verify(token, String(process.env.JWT_KEY));
    const hash = await bcrypt_1.default.hash(newPassword, await bcrypt_1.default.genSalt(10));
    console.log(hash);
    const updateUser = await User_1.default.updateOne({ _id: sub }, {
        $set: { password: hash },
    });
    res.json({ updateUser });
});
// going to reset password by link from email
exports.resetPage = (0, express_async_handler_1.default)(async (req, res) => {
    const { token } = req.params;
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_KEY));
    res.json({ resetLink: "reset password page" });
});
//# sourceMappingURL=passwordService.js.map