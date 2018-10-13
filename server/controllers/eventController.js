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

    static searchEvent(req, res) {
        Event.find({name: new RegExp(req.params.keyword, 'i')})
            .then(function(events) {
                res.status(200).json(events);
            })
            .catch(function(err) {
                res.status(500).json(err.message); 
            });
    }

    static delete(req, res) {
        Event.findById(req.params.id)
            .then(function(event) {
                console.log(event);
                console.log(req.user.id);
                if (event.user.equals(req.user.id)) {
                    Event.findByIdAndDelete(req.params.id)
                        .then(function(deletedEvent) {
                            const response = {
                                success: true,
                                message: `Event with id ${deletedEvent._id} deleted`
                            }
                            res.status(201).json(response);
                        })
                        .catch(function(err) {
                            res.status(500).json(err.message);
                        });
                } else {
                    console.log('error')
                    res.status(400).json({
                        message: 'You cannot delete other users events'
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = EventController;