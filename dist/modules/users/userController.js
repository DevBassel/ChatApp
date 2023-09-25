"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("./userService");
const router = (0, express_1.Router)();
router.get("/me", userService_1.profile);
router.route("/:id").get(userService_1.getUserById).delete(userService_1.deleteUser).put(userService_1.updateUser);
router.get("/", userService_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=userController.js.map