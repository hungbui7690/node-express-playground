const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req
  const job = await Job.findOne({ _id: jobID, createdBy: userID })
  if (!job) throw new NotFoundError(`No job with id ${jobID}`)

  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  console.log(req.user)
  req.body.createdBy = req.user.userID
  console.log(req.body)
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: jobID },
  } = req

  if (company === '' || position === '')
    throw new BadRequestError('Company or Position fields cannot be empty')

  const job = await Job.findOneAndUpdate(
    { _id: jobID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) throw new NotFoundError(`No job with id ${jobID}`)

  res.status(StatusCodes.OK).json({ job })
}

// Delete Job
const deleteJob = async (req, res) => {
  // get userID from req.user -> jobID from req.params
  const {
    user: { userID },
    params: { id: jobID },
  } = req

  const job = await Job.findByIdAndDelete({ _id: jobID, createdBy: userID })

  if (!job) throw new NotFoundError(`No job with id ${jobID}`)
  res.status(StatusCodes.OK).json({ msg: 'delete successfully' })
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
