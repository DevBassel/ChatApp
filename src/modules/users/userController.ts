import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  profile,
  updateUser,
} from "./userService";
import upload from "../middlewares/upload";

const router = Router();

router.get("/me", profile);

router.route("/:id").get(getUserById).delete(deleteUser);

router.route("/").get(getAllUsers);
router.put("/", upload.single("avatar"), updateUser);

export default router;
