const express = require('express')
const { redirect } = require('express/lib/response')
const { find } = require('../models/Wine')
const router = express.Router()
const Wine = require('../models/Wine')

router.post('/registerWine', async (req, res) => {
    const wine = new Wine({
        email: req.body.email,
        productName: req.body.productName,
        originCountry: req.body.originCountry,
        wineType: req.body.wineType,
        grapeType: req.body.grapeType,
        harmonizing: req.body.harmonizing,
        price: req.body.price
    })

    try {
        const savedWine = await wine.save()
        res.status(200)
        res.json(savedWine)
    }
    catch (err) {
        if (err.code == 11000) {
            res.status(409)
            res.json({ message: 'Vinho já cadastrado' })
        } else {
            res.status(400).send(err.message)
        }
    }
})



router.delete('/deleteWine/:productName', async (req, res) => {
    try {
        const removedWine = await Wine.deleteOne({ productName: req.params.productName })
        res.json(removedWine)
    } catch (err) {
        res.json({ message: 'Não foi possivel deletar' })
    }
})

router.patch('/updateWine/:productName', async (req, res) => {

    try {
        const updatedWine = await Wine.updateOne(
            { productName: req.params.productName },
            {
                $set: {
                    originCountry: req.body.originCountry,
                    wineType: req.body.wineType,
                    grapeType: req.body.grapeType,
                    price: req.body.price
                },
                $push: {
                    harmonizing: req.body.harmonizing,
                }
            }, {
            multi: true
        }
        )
        res.json(updatedWine)
    } catch (err) {
        res.status(400)
        res.json({ message: err })
    }
})

router.get('/getAllWines', async (req, res) => {
    try {
        const wine = await Wine.find({})
        res.json(wine)
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByName/:productName', async (req, res) => {
    try {
        const wine = await Wine.find({ productName: req.params.productName })
        res.json(wine)
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByOrigin/:originCountry', async (req, res) => {
    try {
        const wine = await Wine.find({ originCountry: req.params.originCountry })
        if (wine.length != 0) {
            res.status(200)
            res.json(wine)
        } else {
            res.status(204)
            res.json({ message: 'Não existem vinhos desse local' })

        }

    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByType/:wineType', async (req, res) => {
    try {
        const wine = await Wine.find({ wineType: req.params.wineType })

        if (wine.length != 0) {
            res.status(200)
            res.json(wine)
        } else {
            res.status(204)
            res.json({ message: 'Não existem vinhos desse tipo' })
        }

    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByGrapeType/:grapeType', async (req, res) => {
    try {
        const wine = await Wine.find({ grapeType: req.params.grapeType })

        if (wine.length != 0) {
            res.status(200)
            res.json(wine)
        } else {
            res.status(204)
            res.json({ message: 'Não existem vinhos com uvas desse tipo' })
        }

    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByHarmonizing/:harmonizing', async (req, res) => {
    try {
        const wine = await Wine.find({ harmonizing: req.params.harmonizing })

        if (wine.length != 0) {
            res.status(200)
            res.json(wine)
        } else {
            res.status(204)
            res.json({ message: 'Não existem vinhos que harmonizam com essa comida' })
        }

    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByStar', async (req, res) => {
    try {
        const stars = req.body.stars
        console.log(stars)
        const wine = await Wine.find().where('rating').in(stars).exec()
        if (wine.length != 0) {
            res.status(200)
            res.json(wine)
        } else {
            res.status(204)
            res.json({ message: 'Não existem vinhos com essa classificação' })
        }

    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/addReview/:productName', async (req, res) => {
    try {
        const wine = await Wine.find({ productName: req.params.productName })
        var stars = 0
        if (wine) {
            const review = {
                name: req.body.name,
                email: req.body.email,
                productName: req.params.productName,
                review: req.body.review,
                stars: req.body.stars
            }

            wine.map((values) => {
                stars = values.review.reduce((acc, item) => item.stars + acc, 0) / values.review.length
            })

            await Wine.updateOne(
                { productName: req.params.productName },
                {
                    $push: {
                        review: review,
                    },
                    $set: {
                        rating: Number(stars)
                    }
                }
            )
            res.status(200).json({ message: 'Review adicionado com sucesso' })
        } else {
            res.status(404)
            res.json({ message: 'Vinho não encontrado' })
        }
    } catch (err) {
        res.status(404)
        res.json({ message: err })
    }
})

router.get('/getReviewByAuthor/:email', async (req, res) => {
    try {
        const wine = await Wine.findOne({ "review.email": req.params.email })

        if (wine.length != 0) {
            const reviews = []
            wine.review.map((review) => {
                if (review.email == req.params.email) {
                    reviews.push(review)
                }
            })
            res.status(200)
            res.json(reviews)
        } else {
            res.status(204)
            res.json({ message: 'Não existe reviews desse autor' })
        }

    } catch (err) {
        res.status(204)
        res.json({ message: 'Não existe reviews desse autor' })
    }
})


module.exports = router