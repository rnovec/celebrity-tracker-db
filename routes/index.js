var express = require('express')
var router = express.Router()
const { createUser } = require('../dao/controllers')

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Celebrity API' })
})

/* GET home page. */
router.post('/users', async function (req, res, next) {
  var prof1 = await createUser(req.body)
  res.send(prof1)
})

module.exports = router
