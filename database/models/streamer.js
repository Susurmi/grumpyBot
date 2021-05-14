const mongoose = require('mongoose');

const streamerSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    msgID: mongoose.SchemaTypes.String,
    pic: mongoose.SchemaTypes.String
})

module.exports = mongoose.model('streamer', streamerSchema);