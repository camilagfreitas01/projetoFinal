const mongoose = require('mongoose')


const ReviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: false
    },
    stars: {
        type: Number,
        required: true
    }
})

const WineSchema = mongoose.Schema({
    email: {
        type: String,
        requires: true
    },
    productName: {
        type: String,
        requires: true,
        unique: true
    },
    originCountry: {
        type: String,
        required: true,
    },
    vinicula:{
        type: String,
        required: true
    },
    wineType: {
        type: String,
        required: true
    },
    grapeType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    harmonizing: {
        type: Array,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    review: [ReviewSchema]
})

module.exports = mongoose.model('Wine', WineSchema)