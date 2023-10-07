const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/viewcount"

const connectDB = ( async() => {
        const conn =  await mongoose.connect(mongoURI)
        console.log(`MongoDB Connected ${conn.connection.host}-${conn.connection.port}`)
})

module.exports= connectDB