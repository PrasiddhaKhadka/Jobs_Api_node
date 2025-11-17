const mongoose = require("mongoose")


const connectDb = async(MONGO_URI)=>{
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDb