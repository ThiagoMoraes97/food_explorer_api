const { Router } = require("express");
const DishController = require("../controllers/DishController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

dishRoutes = Router();

const dishController = new DishController();

dishRoutes.post("/", ensureAuthenticated, dishController.create);


module.exports = dishRoutes;