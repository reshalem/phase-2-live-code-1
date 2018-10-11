const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Name is required']
    }, 
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: [true, 'Email is already exists']
    }, 
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password length has to be a mininum of 6 characters']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;