require('dotenv').config()
const express = require('express')
const app  = express()

// MIDDLEWARES
const errorHandler =  require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')
const authenticationMiddleware = require('./middlewares/authentication')


// DATABASE CONNECTION
const connectDb = require('./db/connection_db')

app.use(express.json())

const authRouter = require('./routes/auth-routes')
app.use('/api/v1/auth', authRouter)

const jobRouter = require('./routes/job-routes')
app.use('/api/v1/jobs', authenticationMiddleware,jobRouter)


// MIDDLEWARES
app.use(notFound)
app.use(errorHandler)

const startApp=async()=>{
    try {
         await connectDb(process.env.MONGODB_URI)

        app.listen(8000,()=>{
            console.log('Server is running')
        })
    } catch (error) {
        console.log(error)
    }
}


startApp()
