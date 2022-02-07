module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (req.session.user && car.owner == req.session.user.id) {
            res.locals.isOwner = true;
        } else {
            res.locals.isOwner = false;
        }

        res.render('details', {title: `CarTrader - ${car.name}`, car});
    }
}