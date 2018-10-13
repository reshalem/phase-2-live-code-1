const userRouter = require('express').Router();
const UserController = require('../controllers/userController.js');

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.get('/', UserController.getUsersData);

module.exports = userRouter;