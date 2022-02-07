module.exports = {
    get(req, res) {
        res.render('createAccessory', { title: 'Create an Accessory' });
    },
    async post(req, res) {

        try {
            await req.accessory.createAccessory({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl || undefined,
                price: Number(req.body.price),
                owner: req.session.user.id
            });
            res.redirect('/');

        } catch (error) {
            console.log('Error writing to database');
            console.log(error.message);
            res.redirect('/createAccessory')
        }
    }
}