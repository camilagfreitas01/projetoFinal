const mongoose =  require('mongoose')
const reviews = require('./Wine')

const ReviewSchema = mongoose.Schema({
    review: [reviews.ReviewSchema]
})
module.exports = mongoose.model('Review', ReviewSchema)