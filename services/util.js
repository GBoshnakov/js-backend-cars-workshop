function accessoryMapper(accessory) {
    return {
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
        id: accessory._id
    }
}

function carMapper(car) {
    const data =  {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories
    };

    if (data.accessories.length > 0) {
        data.accessories = data.accessories.map(accessoryMapper);
    }

    return data;
}

module.exports = {
    accessoryMapper,
    carMapper
}

