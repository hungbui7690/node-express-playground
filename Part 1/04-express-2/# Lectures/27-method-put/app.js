/*  
  - PUT     Update Data     store.com/api/order/:id       update specific order (params + send data)

  - to perform PUT request, must send data to server
    1. must have ID to know which one is updated
    2. must have BODY (data) that we want to update to (ex: change name "peter" to "jason")


  - update -> use map()
  - test in postman: localhost:5000/api/people/1 -> must have body

  ~~ We will get ID from req.params
  @@ update -> use map()
  @@ delete -> use filter()

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

app.post('/api/people', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  res.status(201).json({ success: true, person: name })
})

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params // when update, must have ID + BODY
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id)) // Find the person that we want to update
  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: `No person with id ${id}` })
  }

  // update Person using map()
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })

  res.status(200).json({ success: true, data: newPeople }) // return to client
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
