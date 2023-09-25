"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = exports.logout = exports.login = exports.verifyEmail = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customErr_1 = require("../errors/customErr");
const sendEmail_service_1 = __importDefault(require("../emails/sendEmail.service"));
const fs_1 = require("fs");
const path_1 = require("path");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 day
// /api/v1/register    |   POST    |   public
exports.register = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email } = req.body;
    // create verify code
    const code = genCode();
    const img = await cloudinary_1.v2.uploader.upload(req.file.path, {
        quality: 10,
    });
    // save user in DB
    const user = await User_1.default.create({
        ...req.body,
        avatar: img.url,
        code,
    });
    if (!user)
        next((0, customErr_1.CreateApiErr)("try again later"));
    // sendCode(code, email, res);
    res.cookie("auth", (0, exports.genToken)(user?._id), {
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
});
// verify email and create user
exports.verifyEmail = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email } = req.cookies;
    const { code } = req.body;
    console.log(code);
    // console.log(req.body);
    if (!email)
        next((0, customErr_1.CreateApiErr)("code is expired go to login", 403));
    const user = await User_1.default.findOne({ email });
    if (user?.verify)
        return next((0, customErr_1.CreateApiErr)("email is verifyed", 400));
    if (user?.code !== Number(code))
        return next((0, customErr_1.CreateApiErr)("bad data", 400));
    await User_1.default.updateOne({ _id: user?._id }, {
        $set: { verify: true },
        $unset: { code },
    });
    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        verify: user.verify,
    });
});
// /api/v1/login    |   POST    |   public
exports.login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next((0, customErr_1.CreateApiErr)("not valid data", 400));
    // get user
    let user = await User_1.default.findOne({ email });
    if (!user)
        return next((0, customErr_1.CreateApiErr)("User Not Found", 404));
    if (!(await bcrypt_1.default.compare(password, String(user?.password))))
        return next((0, customErr_1.CreateApiErr)("Email or password is wrong", 403));
    if (!user.verify) {
        // send code to verify email
        const code = genCode();
        sendCode(code, email, res);
        await User_1.default.updateOne({ email }, {
            $set: { code },
        });
        console.log(code);
    }
    // set cookie
    res.cookie("auth", (0, exports.genToken)(user?._id), {
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
});
// /api/v1/auth/logout    |   POST    |   public
exports.logout = (0, express_async_handler_1.default)(async (req, res) => {
    res.clearCookie("auth");
    res.json({ msg: "loged out" });
});
const genToken = (sub, expiresIn = "10d") => {
    return jsonwebtoken_1.default.sign({ sub }, String(process.env.JWT_KEY), { expiresIn });
};
exports.genToken = genToken;
const sendCode = (code, email, res) => {
    let html = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../emails/templets/verify-email.html"), "utf8");
    // add email and cod in email templet
    html = html.replace("{{EMAIL}}", email);
    html = html.replace("{{CODE}}", String(code));
    // send  email
    (0, sendEmail_service_1.default)({
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
//# sourceMappingURL=authService.js.map