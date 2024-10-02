const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  // 1. get all jobs that associated to the logged in user
  const jobs = await Job.find({ createdBy: req.user.userID }).sort(
    'createdAt _id'
  )

  // 2. return
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
  res.send('Get SINGLE Job')
}

const createJob = async (req, res) => {
  console.log(req.user)
  req.body.createdBy = req.user.userID
  console.log(req.body)
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  res.send('Update Job')
}

const deleteJob = async (req, res) => {
  res.send('Delete Job')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
