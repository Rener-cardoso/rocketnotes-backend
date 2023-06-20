const { Router } = require("express");

const TagsController = require("../constrollers/tagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const tagsController = new TagsController;

tagsRoutes.route('/').get(ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes