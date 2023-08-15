/**************Real Time Controller de productos ********/
const { Router } = require('express')
const ProductManager = require('../classes/ProductManager')

const router = Router()
const managerProducts = new ProductManager()


router.get('/', async (req,res) => {
    const allProducts = await managerProducts.getProducts()

    res.render('realTimeProducts', {
        products : allProducts,
        style: 'realTime.styles.css'
        
    })
})


module.exports = router