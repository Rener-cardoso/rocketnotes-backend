const { Router } = require("express")

const NotesController = require("../constrollers/notesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated);

notesRoutes.route('/').post(notesController.create)
notesRoutes.route('/:id').get(notesController.show)
notesRoutes.route('/:id').delete(notesController.delete)
notesRoutes.route('/').get(notesController.index)

module.exports = notesRoutes


