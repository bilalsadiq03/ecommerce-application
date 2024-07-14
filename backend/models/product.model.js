const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})



const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [, "Please provide name"]
    },

    description : {
        type: String,
        default: "",
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    productImage: {
        type: String,

    },

    stock: {
        type: Number,
        required: true,
        default: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        trim: true
    },
    
    reviews: [reviewSchema],

    rating: {
        type: Number,
        required: true,
        default: 0
    },

    numReviews: {
        type: Number,
        required: true,
        default: 0
    }

},{timestamps :true, versionKey: false})



module.exports = mongoose.model( "Product", productSchema)