const User = require("../models/auth-models")
const { StatusCodes } = require("http-status-codes")
const { BadRequest,UnauthorizedError } = require("../errors")

const register = async(req,res)=>{
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        msg: "User created successfully",
        user: {
            name: user.name,
            email: user.email
        },
        token
    })
}


const login = async(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
        throw new BadRequest("Please provide email and password")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthorizedError("Invalid credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthorizedError("Invalid credentials")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        msg: "User logged in successfully",
        user: {
            name: user.name,
            email: user.email
        },
        token
    })
}


module.exports = {
    register,
    login
}
