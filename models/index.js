const mongoose = require('mongoose');

require('./Car');
require('./Accessory');
require('./User');

async function init() {

    try {
        await mongoose.connect('mongodb://localhost:27017/cartrader', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        mongoose.connection.on('error', (error) => {
            console.error('Database error');
            console.error(error);
        })
    } catch (error) {
        console.error('Error connecting to database');
        process.exit(1);
    }
    
}

module.exports = init;