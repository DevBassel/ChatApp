"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).json({
        error: err.message,
        stack: process.env.NODE_ENV == "dev" ? err.stack : null,
    });
}
exports.default = handleError;
//# sourceMappingURL=ErrorMiddelware.js.map