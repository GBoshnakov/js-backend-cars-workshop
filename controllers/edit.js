module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);
        res.render('edit', {
            title: `Edit Listing - ${car.name}`,
            car
        });
    },
    async post(req, res) {
        const id = req.params.id;
        await req.storage.editCar(id, {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price)
        });
        res.redirect('/');
    }
}