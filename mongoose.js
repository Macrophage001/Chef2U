const initMongoose = (
    password,
    onConnEstablished = () => console.log("MongoDB connected"),
    onConnError = err => console.error(err, "MongoDB connection error"),
    onConnDisconnected = () => console.log("MongoDB disconnected!")
) => {
    const mongoose = require('mongoose');
    const db = mongoose.connection;

    mongoose.connect(process.env.MONGO_URI.replace('<password>', password), { useNewUrlParser: true }, onConnEstablished);
    db.on('error', onConnError);
    db.on('disconnected', onConnDisconnected);
}

module.exports = initMongoose;