require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URL

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection

module.exports = {
  connection
}

