const express = require('express')
const { redirect } = require('express/lib/response')
const router = express.Router()
const Wine = require('../models/Wine')

router.post('/registerWine', async (req, res) => {
    const wine = new Wine({
        productName: req.body.productName,
        originCountry: req.body.originCountry,
        wineType: req.body.wineType,
        grapeType: req.body.grapeType,
        harmonizing: req.body.harmonizing,
        price: req.body.price
    })

    try {
        const savedWine = await wine.save()
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
        if(wine.length != 0){
            res.status(200)
            res.json(wine)
        }else{
            res.status(204)
            res.json({message: 'Não existem vinhos desse local'})

        }
        
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByType/:wineType', async (req, res) => {
    try {
        const wine = await Wine.find({ wineType: req.params.wineType })
      
        if(wine.length != 0){
            res.status(200)
            res.json(wine)
        }else{
            res.status(204)
            res.json({message: 'Não existem vinhos desse tipo'})
        }
        
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByGrapeType/:grapeType', async (req, res) => {
    try {
        const wine = await Wine.find({ grapeType: req.params.grapeType })
      
        if(wine.length != 0){
            res.status(200)
            res.json(wine)
        }else{
            res.status(204)
            res.json({message: 'Não existem vinhos com uvas desse tipo'})
        }
        
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/getWineByHarmonizing/:harmonizing', async (req, res) => {
    try {
        const wine = await Wine.find({ harmonizing: req.params.harmonizing })
      
        if(wine.length != 0){
            res.status(200)
            res.json(wine)
        }else{
            res.status(204)
            res.json({message: 'Não existem vinhos com uvas desse tipo'})
        }
        
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router