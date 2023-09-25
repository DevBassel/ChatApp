"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApiErr = exports.CustomErr = void 0;
class CustomErr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.CustomErr = CustomErr;
const CreateApiErr = (msg, code) => new CustomErr(msg, code || 500);
exports.CreateApiErr = CreateApiErr;
//# sourceMappingURL=customErr.js.map