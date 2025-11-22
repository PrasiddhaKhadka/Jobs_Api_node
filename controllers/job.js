const Job = require('../models/job-models');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFound } = require('../error')

const getAllJobs = async(req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({
        msg:"Success",
        data:jobs,
        count: jobs.length
    })
}

const getJob = async(req,res)=>{
    const jobId = req.params.id;
    const userId = req.user.userId;
    const getJob = await Job.findOne(
        {
        _id: jobId,
        createdBy: userId
        }
    ).exec();
    if(!getJob){
        throw new NotFound('The Job with this id not found!')
    }
    res.status(200).json({
        msg:"Success",
        data:getJob
    })
}

const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({
        msg:"The Job has been created",
        user: req.user,
        job:job
    })
}

const updateJob = async(req,res)=>{
    const jobId = req.params.id;
    const userId = req.user.userId
    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId }, 
        req.body,                           
        { new: true, runValidators: true }  
    );
    if (!job) {
        throw new NotFound('No job found for this user with this ID');
    }
    res.status(200).json({
        msg:"Success",
        job:job
    })
}

const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId   
    });

    if (!job) {
        throw new NotFound('No job found for this user with this ID');
    }

    res.status(200).json({
        msg: 'Job deleted successfully',
        job
    });
};


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}