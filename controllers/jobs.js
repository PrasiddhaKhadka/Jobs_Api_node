const Job = require('../models/jobs-model')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, NotFoundError, UnauthorizedError,} = require('../errors')

const getAllJobs = async(req,res)=>{
    res.json("getAllJobs")    
}


const getJob = async(req,res)=>{
        console.log('Getting JOBS')
           req.body.createBy = req.user.userId
           const job = await Job.find({})
    res.json("getJob")
}

const createJob = async(req,res)=>{
    // FOR VALIDATION 

    req.body.createBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'Job Created Successfully',jobdetails:job})
}

const updateJob = async(req,res)=>{
    res.json("updateJob")
}

const deleteJob = async(req,res)=>{
    res.json("deleteJob")
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}