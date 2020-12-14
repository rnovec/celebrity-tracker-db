var express = require('express')
var router = express.Router()
const { Entry, User, Reaction } = require('../dao/models')
const {
  createOrUpdateEntry,
  getEntryReactions,
  addReactionToEntry,
  getEntries
} = require('../dao/controllers')

router.get('/', async function (req, res, next) {
  const title = req.query.title || ''
  const entries = await getEntries(title)
  res.send(entries)
})

router.post('/', async function (req, res, next) {
  const entry = await createOrUpdateEntry(req.body)
  res.status(201).send(entry)
})

router.get('/:id/reactions', async function (req, res, next) {
  const id = req.params.id
  var reactions = await getEntryReactions(id)
  res.send(reactions)
})


router.put('/:id/reactions', async function (req, res, next) {
  const id = req.params.id
  const data = req.body
  var entry = await addReactionToEntry(id, data)
  res.send(entry)
})

module.exports = router
