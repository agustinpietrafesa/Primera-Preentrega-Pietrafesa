/**********realTimeServer.js contiene el servidor en tiempo real y su configuracion **********/

const {Server} = require('socket.io')


const realTimeServer = httpServer => {
    const io = new Server(httpServer)
    
    io.on('connection', socket => {
        console.log(`Se ha conectado ${socket.id}`)
    })
    
}

module.exports = realTimeServer