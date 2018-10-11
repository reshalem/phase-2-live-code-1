const eventRouter = require('express').Router();
const EventController = require('../controllers/eventController.js');
const isLogin = require('../middlewares/isLogin.js');

eventRouter.get('/', EventController.showAll);
eventRouter.post('/', isLogin, EventController.create);

module.exports = eventRouter;