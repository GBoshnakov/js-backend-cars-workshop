const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'], minlength: [5, 'Name must be more than 5 characters long'] },
    description: { type: String, required: [true, 'Description is required'], minlength: [20, 'Description must be more than 20 characters long'], maxlength: [200, 'Description must be up to 200 characters long'] },
    imageUrl: { type: String, default: 'https://torqueconsultants.com/wp-content/plugins/tbs-car-catalog/images/no-image.png', match: [/^https?:\/\//, 'Image URL must be a valid URL'] },
    price: { type: Number, required: true, min: [0, 'Price can\' be a negative number'] },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;