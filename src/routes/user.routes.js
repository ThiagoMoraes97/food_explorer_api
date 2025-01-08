import { Router } from "express";
import UserController from "../controllers/UserController";

userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);

module.exports = userRoutes;