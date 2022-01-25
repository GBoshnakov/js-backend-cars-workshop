module.exports = {
    get(req, res) {
    res.render('create', {title: "Publish a car"});
    },
    post(req, res) {
        req.storage.publishCar({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            imageUrl: req.body.imageUrl
        });
        console.log(req.body)
        res.redirect('/');
    }
}

