"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const msgSchema = new mongoose_1.default.Schema({
    chatId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    from: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    to: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: [true, "bad data "],
    },
}, {
    timestamps: true,
});
const Msg = mongoose_1.default.model("msgs", msgSchema);
exports.default = Msg;
//# sourceMappingURL=Msg.js.map