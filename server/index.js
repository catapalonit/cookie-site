require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require('massive');
const productsController = require('./controllers/productsController')
const authController = require('./controllers/authController')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
const checkForSession = require('./middlewares/checkForSession')

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');


// Middleware

app.use((req, res, next) => {
    console.log('request');
    next();
})

app.use(express.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);


massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('db connected');
}).catch(err => console.log(err));

app.use(checkForSession);

// Endpoints
app.get('/api/products', productsController.getAll);
app.get('/api/products/:id', productsController.getOne);
app.post('/api/products', productsController.create);
app.put('/api/products/:id', productsController.update);
app.delete('/api/products/:name', productsController.delete);

// Log in endpoints
app.post('/api/login', authController.loginUser)
app.post('/api/register', authController.registerUser)
app.delete('/api/signout', authController.signout)

// Cart Endpoints
app.post("/api/cart/:id", productsController.addToCart)
app.get("/api/cart", productsController.getCart)



//AWS STUFF

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.S3_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};

// Define POST route
app.post('/api/upload', (request, response) => {
    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now().toString();
            const fileName = `bucketFolder/${timestamp}-lg`;
            const data = await uploadFile(buffer, fileName, type);
            return response.status(200).send(data);
        } catch (error) {
            return response.status(400).send(error);
        }
    });
});

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});