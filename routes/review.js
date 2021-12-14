const express = require('express')
const { redirect } = require('express/lib/response')
const router = express.Router()
const Review = require('../models/Review')


router.post('/addReview', async (req, res) => {
    const review = new Review({
        name: req.body.name,
        email: req.body.email,
        review: req.body.review,
        stars: req.body.stars,
        wine: req.body.wine
    })

    try {
        const savedReview = await review.save()
        res.status(200)
        res.json({ message: 'Review salva com sucesso.' })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('/getReviewByWine/:wine', async (req, res) => {
    try {

        const reviews = await Review.find({ wine: req.params.wine })
        if (user.length != 0) {
            res.json(reviews)
        } else {
            res.status(201)
            res.json({ message: 'Vinho inexistente' })

        }

    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getReviewByWine/:wine', async (req, res) => {
    try {

        const reviews = await Review.find({ wine: req.params.wine })
        if (user.length != 0) {
            res.json(reviews)
        } else {
            res.status(201)
            res.json({ message: 'Vinho inexistente' })

        }

    } catch (err) {
        res.json({ message: err })
    }
})




module.exports = router