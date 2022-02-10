const bcrypt = require('bcrypt');

function accessoryMapper(accessory) {
    return {
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
        id: accessory._id,
        owner: accessory.owner
    }
}

function carMapper(car) {
    const data =  {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories,
        owner: car.owner
    };

    if (data.accessories.length > 0) {
        data.accessories = data.accessories.map(accessoryMapper);
    }

    return data;
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

function isLoggedIn() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

function mapError(error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'MongoServerError') {
        if (error.code == 11000) {
            return [{
                msg: 'Username already exists'
            }];
        } else {
            return [{
                msg: 'Request error'
            }];
        }
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(e => ({ msg: e.message }));
    } else if (typeof error.message == 'string') {
        return [{
            msg: error.message
        }];
    } else {
        return [{
            msg: 'Request error'
        }];
    }
}

module.exports = {
    accessoryMapper,
    carMapper,
    hashPassword,
    comparePassword,
    isLoggedIn,
    mapError
}

