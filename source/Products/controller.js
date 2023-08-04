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
        const allProducts = await managerProducts.getProducts()
        const checkCode = allProducts.find(productCode => productCode.code === newProduct.code)

        checkCode 
        ?
        res.json({message: `the product with code ${newProduct.code} is already in the system`})
        :
        res.json({message: `this product was succesfully added ${req.body.title}, ${req.body.description}`})
        
        await managerProducts.addProduct(newProduct)
        
    } catch (error) {
        console.log(error)
    }


    
})

router.put('/:id', async (req, res) => {
    try {
        const { id, key, value } = req.body
        await managerProducts.updateProduct( Number(id), key, value)
        res.json( { message: `update user`})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        await managerProducts.deleteProduct(Number(id) )
        res.json( { message: `the product with id ${req.params.id} has been deleted`})        
    } catch (error) {
        console.log(error)
    }


})

module.exports = router