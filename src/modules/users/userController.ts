import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  profile,
  updateUser,
} from "./userService";

const router = Router();

router.get("/me", profile);

router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

router.get("/", getAllUsers);

export default router;
