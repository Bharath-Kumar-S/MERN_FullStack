import express from "express";
import { getAllUsers, deleteUser, createNewUser, updateUser } from "../controllers/usersController.js";
const router = express.Router();

router.route("/").get(getAllUsers).post(createNewUser).patch(updateUser).delete(deleteUser);

export default router;