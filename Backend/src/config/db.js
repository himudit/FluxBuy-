const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        process.env.mongo_db_connection_string
    )
}
module.exports = connectDB;