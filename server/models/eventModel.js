const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Title is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;