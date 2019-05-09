require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require('massive');
const productsController = require('./controllers/productsController')
const authController = require('./controllers/authController')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
const checkForSession = require('./middlewares/checkForSession')

//AWS Amazon stuff
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// nodemailer stuff
const router = express.Router();
const nodemailer = require('nodemailer');
const creds = require('./config/config');


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

//nodemailer  stuff
var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${content} `

    var mail = {
        from: name,
        to: 'bhawkins3729@gmail.com',  //Change to email address that you want to receive messages on
        subject: 'New Message from Contact Form',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
})

module.exports = router;

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});