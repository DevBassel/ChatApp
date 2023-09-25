"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const customErr_1 = require("../errors/customErr");
exports.default = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.cookies.auth;
    try {
        // check user login
        if (!token)
            next((0, customErr_1.CreateApiErr)("Unauthorized", 401));
        // verify token
        const { sub } = jsonwebtoken_1.default.verify(token, String(process.env.JWT_KEY));
        // get user
        const user = await User_1.default.findById(sub).select("-password");
        if (!user)
            next((0, customErr_1.CreateApiErr)("User Not Found", 404));
        if (!user?.verify)
            next((0, customErr_1.CreateApiErr)("Your Email Not Verifyed ", 401));
        // all done
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=authMiddelware.js.map