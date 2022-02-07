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

async function editCar(id, owner, data) {
    const car = await Car.findById(id);

    if (owner != car.owner) {
        throw new Error('User is not owner');
    }

    car.name = car.name.toLowerCase()
    car.description = data.description
    car.imageUrl = data.imageUrl
    car.price = data.price
    car.accesories = data.accesories

    await car.save();
}

async function deleteById(id, owner) {
    const car = await Car.findById(id);

    if (owner != car.owner) {
        throw new Error('User is not owner');
    }
    await Car.findByIdAndDelete(id);
}

async function attachAccessory(carId, accessoryId, owner) {
    const car = await Car.findById(carId);

    if (owner != car.owner) {
        throw new Error('User is not owner');
    }
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

