const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: (req, res) => {
        //get username password and email off the body
        const { username, password, email } = req.body
        console.log(req.body)
        //check to make sure the username isnt taken
        const db = req.app.get('db')
        db.verifyUser([username]).then(usersList => { //referencing database folder then verifyUser file
            if (usersList.length > 0) {
                res.status(403).json({
                    error: "USERNAME_ALREADY_TAKEN"
                })
            } else {
                //hash the password
                bcrypt.hash(password, 12).then(newPassword => { //first use of bcrypt
                    console.log(newPassword.length);
                    db.createUser(username, newPassword, email).then(() => {
                        req.session.user = {
                            username: username,
                            email: email,
                        }
                        res.status(200).json(req.session.user)
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
        //store it in database
        //add user to session
        //send the user back
    },
    loginUser: (req, res) => {
        //get username and password of of req.body
        const { username, password } = req.body
        //get the database
        const db = req.app.get('db')
        //find the user with that username
        db.verifyUser(username).then(user => {
            if (user.length > 0) {
                bcrypt.compare(password, user[0].password).then(doesMatch => {
                    //check the password
                    if (doesMatch) {
                        req.session.user.username = user[0].username;
                        req.session.user.email = user[0].email;
                        //put them on the session
                        //send response
                        res.status(200).json(req.session.user)
                    } else {
                        res.status(403).json({
                            error: 'USERNAME_OR_PASSWORD_INCORRECT'
                        })
                    }
                })
            } else {
                res.status(404).json({
                    error: 'USER_DOES_NOT_EXIST'
                })
            }
        })
    },
    loginAdmin: (req, res) => {
        //get username and password of of req.body
        const { username, password } = req.body
        //get the database
        const db = req.app.get('db')
        //find the user with that username
        db.is_admin(username).then(user => {
            if (user.length > 0) {
                bcrypt.compare(password, user[0].password).then(doesMatch => {
                    //check the password
                    if (doesMatch) {
                        req.session.user.username = user[0].username;
                        req.session.user.email = user[0].email;
                        req.session.user.admin = true;
                        //put them on the session
                        //send response
                        res.status(200).json(req.session.user)
                    } else {

                        res.status(403).json({
                            error: 'USERNAME_OR_PASSWORD_INCORRECT'
                        })
                    }
                })
            } else {
                res.status(404).json({
                    error: 'USER_DOES_NOT_EXIST'
                })
            }
        })
    },
    getSession: (req, res) => { //used for linking to login if try to add to cart
        res.status(200).json(req.session)
    },
    signout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
    }

}