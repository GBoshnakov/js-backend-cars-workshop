module.exports = {
    async details(req, res) {
        const car = await req.storage.getById(req.params.id);
        console.log(car);
        res.locals = {
            title: `CarTrader - ${car.name}`,
            car
        }
        res.render('details');
    }
}