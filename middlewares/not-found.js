const notFound = async(req,res)=>{
    res.status(400).json({
        msg:'Not Found'
    })
}

module.exports = notFound;