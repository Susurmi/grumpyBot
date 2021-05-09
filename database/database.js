const mongoose = require('mongoose');

const mongoDB = () => mongoose.connect(encodeURI(process.env.MONGODB_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
    .then(console.log('Datenbank verbunden'))
    .catch((err) => console.log(err))

module.exports = { mongoDB };