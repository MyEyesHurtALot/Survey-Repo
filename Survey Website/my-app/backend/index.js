const express = require ('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)

const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}


mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log('DB Connected!'))
.catch(err=>console.log(err))

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
