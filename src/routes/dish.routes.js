const { Router } = require("express");
const DishController = require("../controllers/DishController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const uploadConfig = require("../configs/upload");
const multer = require("multer");

dishRoutes = Router();

const dishController = new DishController();

dishRoutes.post("/", ensureAuthenticated, multer(uploadConfig.MULTER).single("image"), dishController.create);
dishRoutes.put("/:id", ensureAuthenticated, multer(uploadConfig.MULTER).single("image"), dishController.update);
dishRoutes.get("/:id", ensureAuthenticated, dishController.show);
dishRoutes.delete("/:id", ensureAuthenticated, dishController.delete);


module.exports = dishRoutes;