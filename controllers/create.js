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
                imageUrl: req.body.imageUrl || undefined
            });

            res.redirect('/');
        } catch (error) {
            console.log('Error writing to database');
            res.redirect('/create');
        }

    }
}

