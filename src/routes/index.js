const { Router } = require("express");

const userRoutes = require("./user.routes");
const dishRoutes = require("./dish.routes");
const sessionsRoutes = require("./sessions.routes");

const routes  = Router();

routes.use("/users", userRoutes);
routes.use("/dishes", dishRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;

