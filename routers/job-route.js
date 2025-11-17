const express = require("express")
const router = express.Router()
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require("../controllers/jobs")


router.post("/", createJob).get("/", getAllJobs)
router.get("/:id", getJob).patch("/:id", updateJob).delete("/:id", deleteJob)

module.exports = router