const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const cors = require ('cors')
require ('dotenv/config')

//Middlewares
app.use(cors())
app.use(express())
app.use(bodyParser.json())

//import routes

const userRoute = require('./routes/user')

app.use('/user', userRoute)



//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to db'))

app.listen(3000)