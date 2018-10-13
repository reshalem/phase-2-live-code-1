const eventRouter = require('express').Router();
const EventController = require('../controllers/eventController.js');
const isLogin = require('../middlewares/isLogin.js');

eventRouter.get('/', EventController.showAll);
eventRouter.post('/', isLogin, EventController.create);
eventRouter.get('/search/:keyword', isLogin, EventController.searchEvent);
eventRouter.delete('/:id', isLogin, EventController.delete);

module.exports = eventRouter;