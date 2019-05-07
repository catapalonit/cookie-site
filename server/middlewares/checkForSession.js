module.exports = function (req, res, next) {
    const { session } = req;

    if (!session.user) {
        session.user = { username: "", email: "", cart: [], total: 0 };
        console.log("SESSION*****", session.user);

    }

    next();
};