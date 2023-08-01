/********app.js que se encarga unicamente de la configuracion del servidor *******/
const express = require('express');
const router = require('./Routes/index')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)

module.exports = app
