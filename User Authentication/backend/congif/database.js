const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/PW_auth_db'

const connectDB = () => {
    mongoose.connect(MONGODB_URL)
        .then((conn) => console.log(`Connected to DB : ${conn.connection.host} - ${MONGODB_URL}`))
        .catch((err) => console.log(`Database Connection failed ${err.message}`))
}

module.exports = connectDB