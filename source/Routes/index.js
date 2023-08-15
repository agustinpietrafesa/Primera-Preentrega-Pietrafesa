const productController = require('../Products/controller')
const realTimeController = require('../Products/realTimeProducts.controller')


const router = app => {
    app.use('/home', productController)
    app.use('/realtimeproducts', realTimeController)
}

module.exports = router



