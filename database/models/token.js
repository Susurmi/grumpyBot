const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: mongoose.SchemaTypes.String,
    type: mongoose.SchemaTypes.String
},
    {timestamps: true
})

module.exports = mongoose.model('token', tokenSchema);