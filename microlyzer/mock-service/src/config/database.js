const mongoose = require("mongoose")



async function connectToDB() {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI

    if (!mongoUri) {
        throw new Error("MONGODB_URI or MONGO_URI is required")
    }

    try {
        await mongoose.connect(mongoUri)

        console.log("Connected to Database")
    }
    catch (err) {
        console.error("MongoDB connection failed:", err.message)
        throw err
    }
}

module.exports = connectToDB
