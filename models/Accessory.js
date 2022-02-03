const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: 'https://torqueconsultants.com/wp-content/plugins/tbs-car-catalog/images/no-image.png' },
    price: { type: Number, required: true, min: 0 }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;