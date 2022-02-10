module.exports = {
    async home(req, res) {
        const query = req.query;
        const cars = await req.storage.getAll(query);
        let errors = [];

        if (query && cars.length == 0) {
            errors = [{ msg: 'No results found' }]
        }
        res.render('home', { title: 'Browse our cars', cars, query: req.query, errors });
    }
}