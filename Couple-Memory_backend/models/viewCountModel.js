const mongoose = require('mongoose')

const viewCountSchema = mongoose.Schema({
    counter:{
        type: Number
    }
},{timestamps:true})

module.exports = mongoose.model('ViewCounter',viewCountSchema)