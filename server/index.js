require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require('massive');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env


// Middleware
app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
});

// app.use(checkForSession);

// Endpoints


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});