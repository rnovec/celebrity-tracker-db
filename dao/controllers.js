const mongoose = require('mongoose')
const { Entry, User, Reaction } = require('./models')

// controllers
const createOrUpdateEntry = function (entry) {
  const options = {
    // Return the document after updates are applied
    new: true,
    // Create a document if one isn't found. Required
    // for `setDefaultsOnInsert`
    upsert: true,
    useFindAndModify: false,
    setDefaultsOnInsert: true
  }

  return Entry.findOneAndUpdate({ title: entry.title }, entry, options)
}

const createUser = function (user) {
  return User.create(user).then(docProfile => {
    console.log('\n>> Created user:\n', docProfile)
    return docProfile
  })
}

const createReaction = function (reaction) {
  return Reaction.create(reaction).then(docReaction => {
    console.log('\n>> Created Reaction:\n', docReaction)
    return docReaction
  })
}

const addReactionToEntry = async function (entryId, data) {
  const { userId, loved } = data
  var reaction = await Reaction.findOne({ userId, entryId })
  if (!reaction) reaction = await createReaction({ userId, entryId, loved })
  else {
    reaction.loved = loved
    await reaction.save()
  }
  const entry = await Entry.findById(entryId)
  let index = entry.reactions.indexOf(reaction._id)
  if (index === -1) entry.reactions.push(reaction._id)
  entry.save()
  return reaction
}

const getEntries = async function (title, limit = 10, offset = 0) {
  const total = await Entry.count()
  const results = await Entry.find({ title: { $regex: title } })
    .populate('reactions', '-__v -entry')
    .limit(limit)
    .skip(offset)

  return {
    total,
    results
  }
}

const getEntryReactions = function (entryId) {
  // return Reaction.findById(id).populate("entries");
  return Reaction.find({ entryId })
}

module.exports = {
  createOrUpdateEntry,
  createUser,
  createReaction,
  addReactionToEntry,
  getEntries,
  getEntryReactions
}
