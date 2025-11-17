const User = require("../models/auth-models")
const { StatusCodes } = require("http-status-codes")
const { BadRequest } = require("../errors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    const token = jwt.sign({ userId: user._id,name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d'})
    res.status(StatusCodes.CREATED).json({
        msg: "User created successfully",
        token
    })
}


const login = async(req,res)=>{
    res.send("login")    
}


module.exports = {
    register,
    login
}
