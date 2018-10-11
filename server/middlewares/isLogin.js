const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

function isLogin(req, res, next) {
    if (req.headers.hasOwnProperty('access_token')) {
        try {
            const decoded = jwt.verify(req.headers['access_token'], process.env.SECRET_TOKEN);
            User.findOne({email: decoded.email})
                .then(function(user) {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        const err = {
                            message: 'Please login first'
                        }
                        res.status(400).json(err.message);
                    }
                })
                .catch(function(err) {
                    res.status(500).json(err.message);
                });
        } catch(err) {
            res.status(400).json({
                message: 'Token not found'
            });
        }
    }
}

module.exports = isLogin;