const express = require('express')
const bodyParser = require('body-parser')

const EmailRouter = require('./routers/EmailRouter.js')

const app = express()

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/', EmailRouter)

app.listen(3000)
