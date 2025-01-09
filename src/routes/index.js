const { Router } = require("express");

const userRoutes = require("./user.routes");
const dishRoutes = require("./dish.routes");
const ingredientRoutes = require("./ingredient.routes");

const routes  = Router();

routes.use("/users", userRoutes);
routes.use("/dishes", dishRoutes);
routes.use("/ingredients", ingredientRoutes);

module.exports = routes;

