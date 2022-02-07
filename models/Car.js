const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 200 },
    imageUrl: { type: String, default: 'https://torqueconsultants.com/wp-content/plugins/tbs-car-catalog/images/no-image.png' },
    price: { type: Number, required: true, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;