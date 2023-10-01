"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = exports.forgetPassword = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customErr_1 = require("../errors/customErr");
const fs_1 = require("fs");
const authService_1 = require("./authService");
const sendEmail_service_1 = __importDefault(require("../emails/sendEmail.service"));
const path_1 = require("path");
// /api/auth/forgetPassword    |   POST    |   public
exports.forgetPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    const user = await User_1.default.findOne({ email });
    if (!user)
        next((0, customErr_1.CreateApiErr)("user not found", 404));
    const token = (0, authService_1.genToken)(user?._id, "5m");
    const link = `${process.env.HOST}/reset-password/${token}`;
    // sent link to user email
    let html = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../emails/templets/email-resetPassword.html"), "utf8");
    html = html.replace("{{EMAIL}}", email);
    html = html.replace("{{LINK}}", link);
    (0, sendEmail_service_1.default)({ to: email, subject: "Reset Your Password", html });
    res.json({ success: true });
});
// send email to reset password
exports.passwordReset = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    const { sub } = jsonwebtoken_1.default.verify(token, String(process.env.JWT_KEY));
    const hash = await bcrypt_1.default.hash(newPassword, await bcrypt_1.default.genSalt(10));
    const upd = await User_1.default.updateOne({ _id: sub }, {
        $set: { password: hash },
    });
    console.log(upd);
    res.json({ success: true });
});
//# sourceMappingURL=passwordService.js.map