const { Router } = require("express");

const SessionsController = require("../constrollers/sessionsController");
const sessionsController = new SessionsController;

const sessionsRoutes = Router();
sessionsRoutes.route('/').post(sessionsController.create);

module.exports = sessionsRoutes;