"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename(req, file, callback) {
        const ext = file.mimetype.split("/")[1];
        callback(null, `${file.fieldname}_${Date.now().toString(16)}.${ext}`);
    },
});
exports.default = (0, multer_1.default)({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        const fileType = file.mimetype.split("/")[0];
        if (fileType === "image")
            callback(null, true);
        else
            callback(new Error("file shoud be image"));
    },
});
//# sourceMappingURL=upload.js.map