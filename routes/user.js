const express = require('express')
const { redirect } = require('express/lib/response')
const router = express.Router()
const User = require('../models/User')


router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    }
    catch (err) {
        if(err.code == 11000){
            res.status(409)
            res.json({message: 'email já cadastrado'})
        }else{
            res.status(400).send(err.message)
        }
    }
})

router.get('/getUser/:userEmail', async (req, res) => {
    try {
        
        const user = await User.find({ email: req.params.userEmail})
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/deleteUser/:userEmail', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ email: req.params.userEmail,
            password:req.body.password })
        res.json(removedUser)
    } catch (err) {
        res.json({ message: 'não foi possivel deletar' })
    }
})


module.exports = router