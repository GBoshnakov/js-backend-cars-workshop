const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');

const { about } = require('./controllers/about');
const createCar = require('./controllers/create');
const createAccessory = require('./controllers/createAccessory');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');
const attach = require('./controllers/attach');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');


start()

async function start() {
    await initDb();

    const app = express();
    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);

    app.set('view engine', 'hbs');
    app.use(carsService())
    app.use(accessoryService());
    app.use(express.urlencoded({ extended: true }));

    app.use('/static', express.static('static'));
    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details)

    app.route('/create').get(createCar.get).post(createCar.post);
    app.route('/edit/:id').get(edit.get).post(edit.post);
    app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post);
    app.route('/createAccessory').get(createAccessory.get).post(createAccessory.post);
    app.route('/attach/:id').get(attach.get).post(attach.post);

    app.all('*', notFound)


    app.listen(3000, () => console.log('Working on port 3000'));
}