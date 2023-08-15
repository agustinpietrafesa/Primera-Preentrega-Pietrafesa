/**************Controller de productos ********/
const { Router } = require('express')
const ProductManager = require('../classes/ProductManager')

const router = Router()
const managerProducts = new ProductManager()


router.get('/', async (req,res) => {
    const allProducts = await managerProducts.getProducts()

    res.render('home', {
        products : allProducts,
        style: 'styles.css'
    })
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
        const allProducts = await managerProducts.getProducts()
        const updateProduct = allProducts.find(product => product.id === Number(id))
        
        if(updateProduct){
            const productKeys = Object.keys(updateProduct)
            productKeys.includes(key)
            ?
            res.json( { message: `The product with id ${id} has been updated`})
            :
            res.json( { message: `The key ${key} is not a property of the products`})
        }else{
            res.json( { message: `Sorry, we couldnt find a product with id ${id} in the system.`})
        }     
        
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        const allProducts = await managerProducts.getProducts()
        const deletedProduct = allProducts.find(product => product.id === Number(id))
        deletedProduct
        ?
        res.json( { message: `the product with id ${req.params.id} has been deleted`})
        :
        res.json( { message: `There is no product with the id ${req.params.id} in the system.`})       
        
        await managerProducts.deleteProduct(Number(id))
    } catch (error) {
        console.log(error)
    }


})

module.exports = router