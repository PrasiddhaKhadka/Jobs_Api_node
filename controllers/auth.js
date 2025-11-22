const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthorizedError } = require('../error/index')
const jwt = require('jsonwebtoken')
const User = require('../models/auth-models')
const e = require('express')

const register = async(req,res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError('Please enter name, email and password')
    }
    // 1. FIRST CREATE A USER 
    const user = await User.create({name,email,password})

    // 2. Sign token using the saved user's ID
    const token = user.createJwt()

    res.status(StatusCodes.CREATED).json({msg:"Successfully Registered!",email:user.email, token:token})
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Email or password can not be null')
    }

    const user = await User.findOne({email})

    //LET'S COMPARE THE PASSWORD 
    if(!user){
        throw new UnauthorizedError('Invalid Credentials')
    } 

    const isPasswordCorrect = await user.comparePasswords(password)

    if(!isPasswordCorrect){
        throw new UnauthorizedError('Invalid Credentials')
    }

    
    
    const token = user.createJwt()


    res.status(StatusCodes.OK).json({msg:'Hello World',token:token})
}


module.exports = {
    register,
    login
}