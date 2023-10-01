"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("./userService");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = (0, express_1.Router)();
router.get("/me", userService_1.profile);
router.route("/:id").get(userService_1.getUserById).delete(userService_1.deleteUser);
router.route("/").get(userService_1.getAllUsers);
router.put("/", upload_1.default.single("avatar"), userService_1.updateUser);
exports.default = router;
//# sourceMappingURL=userController.js.map