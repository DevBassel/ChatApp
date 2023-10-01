"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("./authService");
const passwordService_1 = require("./passwordService");
const upload_1 = __importDefault(require("../middlewares/upload"));
// /api/v1/auth
const router = (0, express_1.Router)();
router.post("/register", upload_1.default.single("avatar"), authService_1.register);
router.post("/verify", authService_1.verifyEmail);
router.post("/reSendCode", authService_1.reSendValidEmail);
router.post("/login", authService_1.login);
router.post("/logout", authService_1.logout);
router.post("/forget-password", passwordService_1.forgetPassword);
router.route("/reset-password/:token").get(passwordService_1.resetPage).post(passwordService_1.passwordReset);
exports.default = router;
//# sourceMappingURL=authController.js.map