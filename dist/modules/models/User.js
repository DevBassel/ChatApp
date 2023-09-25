"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        min: [2, "name is to low"],
        unique: [true, "this name is exist"],
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "this email is exist"],
        validate: [(val) => emailPattern.test(val), "email not valid"],
    },
    password: {
        type: String,
        minlength: [6, "password length shoud be 6 chars"],
        required: [true, "password is required"],
    },
    verify: {
        type: Boolean,
        default: false,
    },
    code: {
        type: Number,
    },
}, {
    timestamps: true,
});
// hash password before save in database
UserSchema.pre("save", async function (next) {
    try {
        const hash = await bcrypt_1.default.hash(String(this.password), await bcrypt_1.default.genSalt(10));
        this.password = hash;
        next();
    }
    catch (error) {
        console.log(error);
    }
});
const User = mongoose_1.default.model("user", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map