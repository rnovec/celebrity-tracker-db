const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = mongoose.model(
  'User',
  new Schema({
    reactions: [{ type: Schema.ObjectId, ref: 'Reaction' }]
  })
)

const Entry = mongoose.model(
  'Entry',
  new Schema({
    title: String,
    extract: String,
    url: String,
    thumbnail: Object,
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
      }
    ]
  })
)

const Reaction = mongoose.model(
  'Reaction',
  new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    entryId: { type: Schema.Types.ObjectId, ref: 'Entry' },
    loved: Boolean
  })
)

module.exports = {
  User,
  Entry,
  Reaction
}
