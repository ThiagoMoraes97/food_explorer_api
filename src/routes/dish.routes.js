const { Router } = require("express");
const DishController = require("../controllers/DishController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const uploadConfig = require("../configs/upload");
const multer = require("multer");

dishRoutes = Router();

const dishController = new DishController();

dishRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(['admin']), multer(uploadConfig.MULTER).single("image"), dishController.create);
dishRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization(['admin']), multer(uploadConfig.MULTER).single("image"), dishController.update);
dishRoutes.get("/:id", ensureAuthenticated, dishController.show);
dishRoutes.get("/", ensureAuthenticated, dishController.index);
dishRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization(['admin']), dishController.delete);

module.exports = dishRoutes;