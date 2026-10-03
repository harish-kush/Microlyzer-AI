const mongoose = require("mongoose")


async function connectToDB() {
    const mongoUri =
        process.env.MONGO_URI ||
        process.env.MONGODB_URI ||
        "mongodb://127.0.0.1:27017/microlyzer";

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
        })

        console.log(`Connected to MongoDB (${mongoose.connection.host}/${mongoose.connection.name})`)
    }
    catch (err) {
        console.error("MongoDB connection failed:", err.message)
        throw err
    }
}

module.exports = connectToDB
