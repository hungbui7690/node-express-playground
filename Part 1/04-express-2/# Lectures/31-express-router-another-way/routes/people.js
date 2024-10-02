const express = require('express')
const router = express.Router()

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require('../controllers/people')

let { people } = require('../data')

// router.get('/', getPeople) // *** OLD WAY
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)

router.route('/').get(getPeople) // *** NEW WAY
router.route('/').post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson)
router.route('/:id').delete(deletePerson)

module.exports = router
