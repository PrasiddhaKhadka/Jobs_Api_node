require('dotenv').config()

//SECRURITY PACAKGES
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app  = express()

// MIDDLEWARES
const errorHandler =  require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')
const authenticationMiddleware = require('./middlewares/authentication')


// DATABASE CONNECTION
const connectDb = require('./db/connection_db')

// RATE LIMITER
app.set('trust proxy',1);
app.use(rateLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max:100 //  Limit each IP to 100 request per windowMs
    }
));

app.use(express.json())
//USING THE SECURITY MIDDLEWARE IN HERE 
app.use(helmet())
app.use(cors())
app.use(xss())


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
