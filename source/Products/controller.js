/**************Controller de productos ********/
const { Router } = require('express')
const ProductManager = require('../classes/ProductManager')

const router = Router()
const managerProducts = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const allProducts = await managerProducts.getProducts()
        const productsFilter = allProducts.slice(0, limit || 10)
        res.json({Productos: productsFilter})
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const allProducts = await managerProducts.getProducts()
        const productFind = allProducts.find(product => product.id === Number(id))
        if(!productFind){
            res.json(`No se encontro un producto con el id ${id}`)
        }else{
            return res.json({Producto: productFind})
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {


    try {
        

        const { title, description, code, price, state, stock, category, thumbnails} = req.body

        const newProduct = {
            title,
            description,
            code,
            price: Number(price),
            state,
            stock: Number(stock),
            category,
            thumbnails,
        }

        await managerProducts.getProducts()
        await managerProducts.addProduct(newProduct)
        res.json({message: `this product was succesfully added ${req.body.title}`})
        
    } catch (error) {
        console.log(error)
    }


    
})

router.put('/:id', (req, res) => {
    console.log(req.body)
    res.json( { message: `update user`})
})

router.delete('/:id', (req, res) => {
    res.json( { message: `delete user ${req.params.id}`})
})

module.exports = router