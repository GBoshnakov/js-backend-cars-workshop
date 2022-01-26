module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        res.locals = {
            title: `CarTrader - ${car.name}`,
            car
        }
        res.render('details');
    }
}