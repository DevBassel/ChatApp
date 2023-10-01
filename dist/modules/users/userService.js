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
const cloudinary_1 = require("cloudinary");
const bcrypt_1 = require("bcrypt");
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
    const { _id } = req.user;
    const { name, password } = req.body;
    if (String(_id) !== String(req.user._id))
        return next((0, customErr_1.CreateApiErr)("don't have an access", 401));
    const user = await User_1.default.findById(_id);
    if (!user)
        return next((0, customErr_1.CreateApiErr)("User Not Found", 404));
    if (!(0, bcrypt_1.compareSync)(password, String(user.password)))
        return next((0, customErr_1.CreateApiErr)("Unauthorized", 401));
    if (req.file) {
        const img = await cloudinary_1.v2.uploader.upload(req.file.path, {
            quality: 10,
        });
        await User_1.default.updateOne({ _id }, { $set: { name, avatar: img.url } });
    }
    await User_1.default.updateOne({ _id }, { $set: { name } });
    res.json({ success: true });
});
//# sourceMappingURL=userService.js.map