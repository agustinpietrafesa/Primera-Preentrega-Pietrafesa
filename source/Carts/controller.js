/*******Controller de carts ********/
const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.json({message: 'Todos los products'})
})

router.get('/:id', (req, res) => {
    res.json( { message: `el producto es ${req.params.id}`})
})

router.post('/', (req, res) => {
    res.json({message: 'Nuevo producto'})
})

router.put('/:id', (req, res) => {
    console.log(req.body)
    res.json( { message: `update product`})
})

router.delete('/:id', (req, res) => {
    res.json( { message: `delete prodcut ${req.params.id}`})
})

module.exports = router