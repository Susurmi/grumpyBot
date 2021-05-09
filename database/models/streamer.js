const mongoose = require('mongoose');

const streamerSchema = new mongoose.Schema({
    description: mongoose.SchemaTypes.String,
    streamer: mongoose.SchemaTypes.Array
})

module.exports = mongoose.model('streamer', streamerSchema);