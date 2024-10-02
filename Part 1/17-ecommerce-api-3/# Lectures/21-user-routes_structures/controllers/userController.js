const getAllUsers = async (req, res) => {
  res.send('Get All Users')
}

const getSingleUser = async (req, res) => {
  console.log(req.body)
  res.send('Get Single Users')
}

const showCurrentUser = async (req, res) => {
  res.send('Show Current User')
}

const updateUser = async (req, res) => {
  res.send(req.body)
}

const updateUserPassword = async (req, res) => {
  res.send(req.body)
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
