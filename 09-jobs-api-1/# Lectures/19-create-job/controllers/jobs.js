const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  res.send('Get All Jobs')
}

const getJob = async (req, res) => {
  res.send('Get SINGLE Job')
}

const createJob = async (req, res) => {
  console.log('createJob - req.user: ', req.user) // check if we can see user info here or not

  req.body.createdBy = req.user._id // take createdBy from req.user and add to req.body
  console.log('createJob - req.body: ', req.body)

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
