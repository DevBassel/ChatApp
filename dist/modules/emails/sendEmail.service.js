"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});
exports.default = ({ to, subject, html }) => {
    const config = {
        from: process.env.EMAIL,
        to,
        subject,
        html,
    };
    transporter.sendMail(config, (err, info) => {
        if (err)
            console.log(err);
        else
            console.log({ emailInfo: info.response });
    });
};
//# sourceMappingURL=sendEmail.service.js.map