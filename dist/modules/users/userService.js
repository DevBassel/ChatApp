"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUserById = exports.getAllUsers = exports.profile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const customErr_1 = require("../errors/customErr");
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// /api/ profile    |   GET    |   private
exports.profile = (0, express_async_handler_1.default)(async (req, res) => {
    res.json(req.user);
});
// /api/ allUsers    |   GET    |   private
exports.getAllUsers = (0, express_async_handler_1.default)(async (req, res, next) => {
    const users = await User_1.default.find({
        _id: { $ne: req.user._id },
    }).select("-password -__v");
    res.json(users);
});
// /api/ users/:id    |   GET    |   private
exports.getUserById = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id))
        return next((0, customErr_1.CreateApiErr)("not valid id ", 400));
    const user = await User_1.default.findById(id).select("-password");
    if (!user)
        return next((0, customErr_1.CreateApiErr)("User Not Found ", 404));
    res.json(user);
});
// /api/ users/:id    |   DELETE    |   private
exports.deleteUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if ((0, mongoose_1.isValidObjectId)(id))
        return next((0, customErr_1.CreateApiErr)("Not valid id", 400));
    if (req.user.rule !== "admin" || String(req.user._id) !== id)
        return next((0, customErr_1.CreateApiErr)("don't have an access", 401));
    const user = await User_1.default.findByIdAndDelete(id);
    if (!user)
        return next((0, customErr_1.CreateApiErr)("Not Found", 404));
    res.json({ success: true });
});
// /api/ users/:id    |   PUT    |   private
exports.updateUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, newPassword } = req.body;
    if (String(id) !== String(req.user._id))
        return next((0, customErr_1.CreateApiErr)("don't have an access", 401));
    const user = await User_1.default.findById(id);
    if (!(await bcrypt_1.default.compare(password, String(user?.password))))
        return next((0, customErr_1.CreateApiErr)("wrong password", 400));
    const hash = await bcrypt_1.default.hash(newPassword, await bcrypt_1.default.genSalt(10));
    const update = await User_1.default.updateOne({ _id: id }, { $set: { name, email, password: hash } });
    res.json(update);
});
//# sourceMappingURL=userService.js.map