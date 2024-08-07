const stripe = async (req, res) => {
  console.log(req.body)
  res.send('stripe route')
}

module.exports = stripe
