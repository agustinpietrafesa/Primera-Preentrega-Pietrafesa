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

/*********Muestra los productos de un carrito puntual  *******/
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const products = await managerCarts.getCartProducts( cid )

        if(products){
            res.json({'Products': products})
        }else{
            res.json({message: `We couldnt find a cart with id ${cid}`})
        }
    } catch (error) {
        console.log(error)
    }

})


/******Crea un nuevo carrito  ********/
router.post('/', async (req, res) => {
    try {
        await managerCarts.addCart()
        res.json({message: 'A new cart has been created'})
    } catch (error) {
        console.log(error)
    }

})

/******Agregar producto al carrito  ********/
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid , pid } = req.params
        await managerCarts.addProductToCart(cid,pid)
        const allCarts = await managerCarts.getCarts()
        const cart = allCarts.find(cart => cart.cartId === Number(cid))
        const theProduct = cart.products.find(productId => productId.id === Number(pid))
        theProduct
        ?
        res.json({message: `The product with id ${pid} has been added`})
        :
        res.json({message: `Sorry, we couldnt find a product with id ${pid} in the system.`})

    } catch (error) {
        console.log(error)
    }

})


module.exports = router