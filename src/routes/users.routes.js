const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../constrollers/usersController");
const UserAvatarController = require("../constrollers/userAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


usersRoutes.route('/').post( usersController.create );
usersRoutes.route('/').put(ensureAuthenticated ,usersController.update);
usersRoutes.route('/avatar').patch(ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;