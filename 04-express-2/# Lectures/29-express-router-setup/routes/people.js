const express = require('express')
const router = express.Router()
let { people } = require('../data')

// "/", but not "/api/people" -> since we create the base path in app.js
router.get('/', (req, res) => {
  res.status(200).send({ success: true, data: people })
})

router.post('/', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  res.status(201).json({ success: true, person: name })
})

// "/api/people/postman" will be changed to  "/postman"
router.post('/postman', (req, res) => {
  const { name } = req.body
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })

  res.status(201).json({ success: true, data: [...people, name] })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))
  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `No person with id ${id}` })
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})

router.delete('/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `No person with id ${id}` })
  }
  const newPeople = people.filter((person) => {
    return person.id !== Number(req.params.id)
  })

  res.status(200).json({ success: true, data: newPeople })
})

module.exports = router // to app.js
