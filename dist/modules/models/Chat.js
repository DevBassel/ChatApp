"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chateSchema = new mongoose_1.default.Schema({
    members: {
        type: [mongoose_1.default.Types.ObjectId],
        required: true,
    },
    sender: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    reciver: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
});
const Chat = mongoose_1.default.model("chat", chateSchema);
exports.default = Chat;
//# sourceMappingURL=Chat.js.map