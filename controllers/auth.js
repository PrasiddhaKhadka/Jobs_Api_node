const User = require("../models/auth-models")
const { StatusCodes } = require("http-status-codes")
const { BadRequest } = require("../errors")

const register = async(req,res)=>{
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    res.status(StatusCodes.CREATED).json({
        msg: "User created successfully",
        user: user
    })
}


const login = async(req,res)=>{
    res.send("login")    
}


module.exports = {
    register,
    login
}
