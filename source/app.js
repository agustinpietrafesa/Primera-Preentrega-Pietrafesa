/********app.js que se encarga unicamente de la configuracion del servidor *******/
const express = require('express');
const router = require('./Routes/index')
const handlebars = require('express-handlebars');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.engine('handlebars' , handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

router(app)

module.exports = app
