const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')

const connectDB = async() =>{
    try {
        mongoose.connect(db,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('-- Error In Bound --')
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;
