const mongoose = require("mongoose")


const categorySchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timeStamps: true, versionKey: false})

// timestamp -> helps to get the time of created and updation
// versionkey ->  removes __v from the schema

module.exports = mongoose.model( "Category", categorySchema)