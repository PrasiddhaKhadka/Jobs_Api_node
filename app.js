require('dotenv').config()
const express = require("express")
const app = express()
const errorHandler = require("./middlewares/error-handler")
const notFound = require("./middlewares/not-found")


const PORT = 8000

// DATABASE 
const connectDb = require("./db/connect")


app.use(express.json())

// app.use('/api/v1', require("./routes)

// ROUTES



// MIDDLEWARE
app.use(errorHandler)
app.use(notFound)



const startApp = async()=>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))
    } catch (error) {
        console.error(error)
    }
}

startApp()