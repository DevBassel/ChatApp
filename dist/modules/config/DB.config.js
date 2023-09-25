"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function dbConnect(CB) {
    try {
        await mongoose_1.default.connect(String(process.env.DB_URI));
        console.log("database connected");
        CB();
    }
    catch (error) {
        console.log(error);
    }
}
exports.dbConnect = dbConnect;
//# sourceMappingURL=DB.config.js.map