const productController = require('../Products/controller')
const cartsController = require('../Carts/controller')

const router = app => {
    app.use('/home', productController)
    app.use('/api/carts', cartsController)
}

module.exports = router



