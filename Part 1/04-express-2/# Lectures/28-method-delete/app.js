/*    
  - Delete  Delete Data     store.com/api/order/:id       delete order (path param)


  - similar to PUT, but:
    + just need ID, no need BODY
    + use filter() to delete

*/

const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/api/people', (req, res) => {
  res.status(200).send({ success: true, data: people })
})

app.post('/login', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (name) return res.status(200).send(`Welcome ${name}`)

  return res.status(404).send('Please provide credentials')
})

app.post('/api/people', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  res.status(201).json({ success: true, person: name })
})

app.post('/api/people/postman', (req, res) => {
  const { name } = req.body
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })

  res.status(201).json({ success: true, data: [...people, name] })
})

app.put('/api/people/:id', (req, res) => {
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

app.delete('/api/people/:id', (req, res) => {
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

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
