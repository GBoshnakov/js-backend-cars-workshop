const fs = require('fs').promises;


async function read() {
    try {
        const data = await fs.readFile('./services/data.json');
        return JSON.parse(data);
    } catch (error){
        console.error('Error reading database');
        console.error(error);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile('./services/data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing in database');
        console.error(error);
        process.exit(1);
    }
}

async function getAll(query) {
    const data = await read();
    let cars = Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        cars =  cars.filter(car => car.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if (query.from) {
        cars = cars.filter(car => car.price >= Number(query.from));
    }
    if (query.to) {
        cars = cars.filter(car => car.price <= Number(query.to));
    }

    return cars;

}

async function getById(id) {
    const data = await read();
    const car = data[id];

    if (car) {
        return Object.assign({}, { id }, car);
    } else {
        return undefined;
    }
}

async function publishCar(car) {
    const cars = await read();
    let id = nextId();

    while (cars.hasOwnProperty(id)) {
        id = nextId();
    }

    cars[id] = car;
    await write(cars);
}


function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16)); 
}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        publishCar
    };
    next();
};

