/**************Controller de productos ********/
const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.json({message: 'todos los productos'})
})

router.get('/:id', (req, res) => {
    res.json( { message: `el producto es ${req.params.id}`})
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.json({message: `${req.body}`})
})

router.put('/:id', (req, res) => {
    console.log(req.body)
    res.json( { message: `update user`})
})

router.delete('/:id', (req, res) => {
    res.json( { message: `delete user ${req.params.id}`})
})

module.exports = router