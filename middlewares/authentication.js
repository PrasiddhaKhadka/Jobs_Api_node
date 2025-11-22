const User = require('../models/auth-models')
const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../error')


const authenticationMiddleware = async(req,res,next)=>{

    // CHECKING THE HEADER AT FIRST 
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer') ){
        throw new UnauthorizedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1] 
    try{
        const payload = await jwt.verify(token,process.env.JWT_SECRET)
        //  ALTERNATE CODE 
        // const user = User.findById(payload.id).select('-password')
        // req.user = user

        // attach the user to the job routes
        // This sticker was NOT brought by the kid.
        // It was PUT on the kid by the teacher.
        // console.log(payload)
        req.user = {userId:payload.user_id, name:payload.name}
        
        next(); 
    }
    catch(err){
        console.log(err)
        throw new UnauthorizedError('Authentication Invalid')
    }

}

module.exports = authenticationMiddleware