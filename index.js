const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models/index');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');

const { about } = require('./controllers/about');
const createCar = require('./controllers/create');
const createAccessory = require('./controllers/createAccessory');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');
const attach = require('./controllers/attach');
const authController = require('./controllers/auth');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');
const { isLoggedIn } = require('./services/util');


start()

async function start() {
    await initDb();

    const app = express();
    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);

    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'mySecretThing',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));

    app.use(carsService())
    app.use(accessoryService());
    app.use(authService());
    app.use(express.urlencoded({ extended: true }));

    app.use('/static', express.static('static'));
    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    // app.get('/logout', logout);

    app.route('/create').get(isLoggedIn(), createCar.get).post(isLoggedIn(), createCar.post);
    app.route('/edit/:id').get(isLoggedIn(), edit.get).post(isLoggedIn(), edit.post);
    app.route('/delete/:id').get(isLoggedIn(), deleteCar.get).post(isLoggedIn(), deleteCar.post);
    app.route('/createAccessory').get(isLoggedIn(), createAccessory.get).post(isLoggedIn(), createAccessory.post);
    app.route('/attach/:id').get(isLoggedIn(), attach.get).post(isLoggedIn(), attach.post);
    // app.route('/register').get(registerGet).post(registerPost);
    // app.route('/login').get(loginGet).post(loginPost);
    app.use(authController);

    app.all('*', notFound)


    app.listen(3000, () => console.log('Working on port 3000'));
}