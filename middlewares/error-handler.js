const { CustomApiError } = require("../error/index")
const { StatusCodes } =  require("http-status-codes")

const errorHandler = async(err, req,res,next)=>{
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({
            msg:err.message
        })
    }else{
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
    }
}

module.exports = errorHandler;