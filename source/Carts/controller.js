/*******Controller de carts ********/
const { Router } = require('express')
const CartManager = require('../classes/CartManager')

const router = Router()
const managerCarts = new CartManager()

/*******Muestra todos los carritos *********/
router.get('/', async (req, res) => {
    try {
        const allCarts = await managerCarts.getCarts()
        res.json({Carts: allCarts})
    } catch (error) {
        console.log(error)
    }

})

router.get('/:id', (req, res) => {
    res.json( { message: `el producto es ${req.params.id}`})
})


/******Crea un nuevo carrito  ********/
router.post('/', async (req, res) => {
    try {
        await managerCarts.addCart()
        res.json({message: 'New cart'})
    } catch (error) {
        console.log(error)
    }

})

/******Agregar productso al carrito  ********/
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid , pid } = req.params
        await managerCarts.addProductToCart(cid,pid)
        res.json({message: 'Agregando productos'})
    } catch (error) {
        console.log(error)
    }

})


module.exports = router