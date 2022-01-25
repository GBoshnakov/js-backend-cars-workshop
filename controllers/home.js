module.exports = {
    async home(req, res) {
        const query = req.query;
        const cars = await req.storage.getAll(query);
        res.locals = {
            title: "Browse our cars",
            query: req.query,
            cars
        }
        res.render('home');
    }
}