const Car = require("../models/Car");
const { carMapper } = require('./util');

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search.toLowerCase());
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) }
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const cars = await Car.find(options);

    return cars.map(carMapper);
}

async function getById(id) {
    const car = await Car.findById(id).populate('accessories');

    if (car) {
        return carMapper(car);
    } else {
        return undefined;
    }
}

async function publishCar(car) {
    await Car.create(car);
}

async function editCar(id, car) {
    const data = await Car.findById(id);

    data.name = car.name.toLowerCase()
    data.description = car.description
    data.imageUrl = car.imageUrl
    data.price = car.price
    data.accesories = car.accesories

    await data.save();
}

async function deleteById(id) {
    await Car.findByIdAndDelete(id);
}

async function attachAccessory(carId, accessoryId) {
    const car = await Car.findById(carId);

    car.accessories.push(accessoryId);

    await car.save();
}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        publishCar,
        editCar,
        deleteById,
        attachAccessory
    };
    next();
};

