require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter.js');
const eventRouter = require('./routes/eventRouter.js');

mongoose.connect('mongodb://localhost/live-events', {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/users', userRouter);
app.use('/events', eventRouter);

app.listen(port, function() {
    console.log('Listening on port', port);
});