const getAllJobs = async(req,res)=>{
    res.json("getAllJobs")    
}


const getJob = async(req,res)=>{
    res.json("getJob")
}

const createJob = async(req,res)=>{
    res.json(req.user)
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