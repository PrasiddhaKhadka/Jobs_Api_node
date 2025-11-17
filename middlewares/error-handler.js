const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomApiError){
        res.status(err.statusCode).send(err.message)
    }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong")
    }

}

module.exports = errorHandler
