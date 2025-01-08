import { Router } from "express";

import userRoutes from "./user.routes";

const routes  = Router();

routes.use("/users", userRoutes);

module.exports = routes;

