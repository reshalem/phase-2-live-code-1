const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
            .then(function(user) {
                const response = {
                    success: true,
                    message: `Account ${user.name} registered`
                }
                res.set({
                    'Content-Type': 'application/json',
                    'Location': '/users/register'
                });
                res.status(201).json(response);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(function(user) {
                if (user) {
                    const token = jwt.sign({id: user._id, name: user.name, email: user.email},
                    process.env.SECRET_TOKEN);
                    res.set({
                        'Content-Type': 'application/json',
                        'Location': '/users/login'
                    });
                    res.status(201).json({token: token});
                } else {
                    const err = {
                        message: 'Wrong username or password'
                    };
                    res.status(400).json(err.message);
                }
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = UserController;