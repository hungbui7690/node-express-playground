const getAllJobs = async (req, res) => {
  res.json('Get All Jobs')
}

const getJob = async (req, res) => {
  res.json('Get SINGLE Job')
}

const createJob = async (req, res) => {
  res.json('Create Job')
}

const updateJob = async (req, res) => {
  res.json('Update Job')
}

const deleteJob = async (req, res) => {
  res.json('Delete Job')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
