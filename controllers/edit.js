const { mapError } = require('../services/util');

module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car.owner != req.session.user.id) {
            return res.redirect('/');
        }

        res.render('edit', {
            title: `Edit Listing - ${car.name}`,
            car
        });
    },
    async post(req, res) {
        const id = req.params.id;
        try {
            await req.storage.editCar(id, req.session.user.id, {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                price: Number(req.body.price)
            });
            res.redirect('/details/' + id);
        } catch (error) {
            res.render('edit', { title: 'Edit Listing', errors: mapError(error), car: req.body });
        }

    }
}