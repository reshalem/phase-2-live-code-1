const Event = require('../models/eventModel.js');

class EventController {
    static create(req, res) {
        Event.create({
            name: req.body.name,
            location: req.body.location,
            address: req.body.address,
            user: req.user._id
        })
            .then(function(event) {
                res.set({
                    'Content-Type': 'application/json',
                    'Location': '/quotes'
                });
                res.status(201).json(event);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static showAll(req, res) {
        Event.find()
            .then(function(events) {
                res.set('Content-Type', 'application/json');
                res.status(200).json(events);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = EventController;