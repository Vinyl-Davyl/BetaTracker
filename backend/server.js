// Express and CORS
const express = require('express');
const cors = require('cors');

/***
 * At this point, we can connect to our datebase on MongoDB Atlas
 */
// Mongoose here would help us connect to our mongoDB database
const mongoose = require('mongoose');

// Configures, so we can head on variables in the dotenv file
require('dotenv').config();

// Creating our express server, which would run on port 5000
const app = express();
const port = process.env.PORT || 5000;

// The cors middleware
app.use(cors());
app.use(express.json());

// The uri here is our data base uri, gotten from the mongoDB dashboard(thats where our database is stored and thats how we store our uri)
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Making server listen to the files created in routes folder
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// Whenever someone uses url /exercises, It loads everything in the exercisesRouter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


// Server starter
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});