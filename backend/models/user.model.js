const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        rquired: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minLength: 10
    },
    userType: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"]
    } 
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model("User", userSchema)