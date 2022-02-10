const { mapError } = require('../services/util');

module.exports = {
    get(req, res) {
        res.render('create', { title: "Publish a car" });
    },
    async post(req, res) {
        try {
            await req.storage.publishCar({
                name: req.body.name.toLowerCase(),
                description: req.body.description,
                price: Number(req.body.price),
                imageUrl: req.body.imageUrl || undefined,
                owner: req.session.user.id
            });

            res.redirect('/');
        } catch (error) {
            console.log('Error writing to database');
            res.render('create', { title: 'Publish  a car', errors: mapError(error), car: req.body });
        }

    }
}

