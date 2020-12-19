const { connection } = require('../dao')
const {
  createEntry,
  createProfile,
  createReaction,
  addReactionToEntry,
  getEntryWithPopulate
} = require('../dao/controllers')

// api
const run = async function () {
  var entry1 = await createEntry({
    title: 'Alberth Einstein',
    summary: 'Deserunt in ut reprehenderit ut occaecat fugiat.',
    url: 'Deserunt in ut reprehenderit ut occaecat fugiat.'
  })

  var prof1 = await createProfile({
    user_id: 'kakakaka'
  })

  var react1 = await createReaction({
    type: 'love',
    _profile: prof1._id,
    _entry: entry1._id
  })

  var entry1 = await addReactionToEntry(entry1._id, react1)
  console.log('\n>> entry1:\n', entry1)

  entry1 = await getEntryWithPopulate(entry1._id)
  console.log('\n>> entry1:\n', entry1)
}

connection.on('error', () => console.error.bind(console, 'connection error:'))
connection.once('open', () => console.log('Conectado a MongoDB!!!'))
run()
