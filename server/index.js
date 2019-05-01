require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require('massive');
const productsController = require('./controllers/productsController')
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

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('db connected');
}).catch(err => console.log(err));

// app.use(checkForSession);

// Endpoints
app.get('/api/products', productsController.getAll);
app.get('/api/products/:id', productsController.getOne);
app.post('/api/products', productsController.create);
app.put('/api/products/:id', productsController.update);
app.delete('/api/products/:id', productsController.delete);



app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});