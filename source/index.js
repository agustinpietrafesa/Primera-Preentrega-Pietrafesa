/********index.js que se encarga unicamente de levantar el servidor  *******/
const realTimeServer = require('./realTimeServer.js')
const app = require('./server')

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Running at port ${PORT}`)
});


realTimeServer(httpServer)