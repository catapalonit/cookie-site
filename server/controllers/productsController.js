module.exports = {

    getAll: async (req, res) => { //get all obviously
        const dbInstance = req.app.get('db');

        let products = await dbInstance.read_products() //connected the sql file here
            .catch(err => {
                res.status(500).send({ errorMessage: "Error" });
                console.log(err)
            });

        res.status(200).send(products)
    },

    getOne: async (req, res) => {//get by id
        const dbInstance = req.app.get('db');

        let product = await dbInstance.read_one_product(req.params.id) //connected the sql file here
            .catch(err => {
                res.status(500).send({ errorMessage: "Error" });
                console.log(err)
            });
        res.status(200).send(product)
    },

    create: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.create_product( //connected the sql file here
            [
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
    },
    addToCart: (req, res) => {
        const dbInstance = req.app.get('db');
        console.log("USER SESSION ******: ", req.session.user)

        dbInstance.add_to_cart(req.params.id)
            .then((response) => {
                console.log(response)
                req.session.user.cart.push(
                    {
                        image: response[0].image,
                        name: response[0].name,
                        price: response[0].price
                    })
                req.session.user.total += response[0].price
                res.status(200).json(req.session.user)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: "Error" });
                console.log(err)
            });
    },
    getCart: (req, res) => {
        res.status(200).json(req.session.user)
    }
};