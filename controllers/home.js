module.exports = {
    async home(req, res) {
        const query = req.query;
        const cars = await req.storage.getAll(query);

        res.render('home', {title: 'Browse our cars', cars, query: req.query});
    }
}