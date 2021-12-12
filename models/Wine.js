const mongoose =  require('mongoose')

const WineSchema = mongoose.Schema({
    productName: {
        type: String,
        requires: true,
        unique: true
    },
    originCountry: {
        type: String,
        required: true,
    },
    wineType: {
        type: String,
        required: true
    },
    grapeType:{
        type: String,
        required: true
    },
    harmonizing:{
        type: Array,
        required: false
    },
    price:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Wine', WineSchema)