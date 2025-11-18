const User = require('../models/auth-models')
const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')

const authenticationMiddleWare = async(req,res,next)=>{
// CHECKING THE HEADER
const authHeader = await req.headers.authoraization;
if(!authHeader || !authHeader.startsWith('Bearer')){
 throw new UnauthorizedError('Authentication Invalid');
}

const token = authHeader.split(' ')[1];
try {
    console.log(token)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = {userId: payload.userId, name: payload.name}
    // ALTERNATE WAY 
    // const user = User.findBy(payload.id).select('-password') // no need of password
    // req.user = user
    next()

} catch (error) {
    console.log(error)
    throw new UnauthorizedError('Authentication Invalid')
}


    
}

module.exports = authenticationMiddleWare;

