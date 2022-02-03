module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [car, allAccessories] = await Promise.all([req.storage.getById(id), req.accessory.getAll()]);

            const allId = car.accessories.map(a => a.id.toString());
            const accessories = allAccessories.filter(a => allId.includes(a.id.toString()) == false);

            res.render('attachAccessory', { title: 'Attach Accessory', car, accessories });
        } catch (error) {
            console.log(error.message);
            res.redirect('/404');
        }


    },
    async post(req, res) {
        const carId = req.params.id;
        const accessoryId = req.body.accessory;

        try {
            await req.storage.attachAccessory(carId, accessoryId);
            res.redirect('/details/' + carId);
        } catch (error) {
            console.log('Error attaching accessory');
            console.log(error.message);
            res.redirect('/details/' + carId);
        }
    }
}