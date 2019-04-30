module.exports = {
    create: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.create_product( //connected the sql file here
            [
                req.body.image,
                req.body.name,
                req.body.price
            ]
        )
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Error" });
                console.log(err)
            });
    },

    getOne: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_product(req.params.id) //connected the sql file here
            .then(product => res.status(200).send(product))
            .catch(err => {
                res.status(500).send({ errorMessage: "Errorzone" });
                console.log(err)
            });
    },

    getAll: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products() //connected the sql file here
            .then(products => res.status(200).send(products))
            .catch(err => {
                res.status(500).send({ errorMessage: "Errorzone" });
                console.log(err)
            });
    },

    update: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.update_product( //connected the sql file here
            [
                req.params.id,
                req.query.name
            ])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Error" });
                console.log(err)
            });
    },

    delete: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.delete_product(req.params.id) //connected the sql file here
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: "Error" });
                console.log(err)
            });
    }
};