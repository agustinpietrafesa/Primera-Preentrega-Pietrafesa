const fs = require('fs')
const ProductManager = require('../classes/ProductManager')

const managerProducts = new ProductManager()

class CartManager {
    path
    carts

    constructor(){
        this.carts = []
        this.path = './files/Carts.JSON'

    };


    async getCarts() {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                this.carts = JSON.parse(data)
                return this.carts ? this.carts : []
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addCart() {
        try {

            const allCarts = await this.getCarts()
            const lastCartAdded = allCarts[allCarts.length - 1]

            const newCart = {
                cartId: 0,
                products: []
            }

            
            lastCartAdded
            ?
            newCart.cartId = lastCartAdded.cartId + 1
            :
            newCart.cartId = 1;

            
            this.carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const allCarts = await this.getCarts()
            const cart = allCarts.find(cart => cart.cartId === Number(cartId))
            const allProducts = await managerProducts.getProducts()
            const product = allProducts.find(product => product.id === Number(productId))

            if(product){
                const { id, code } = product
                
                if(cart){
                    cart.products.id = id,
                    cart.products.code = code
              
                    console.log(cart.products)
                    if(cart.products){
                        cart.products.quantity = 1
                    }else{
                        const newQuantity = cart.products.quantity +1 
                        cart.products.quantity = newQuantity + 1
                    }

                    
                }else{
                    console.log('el carrito no existe')
                }
            }else {
                console.log('El producto no existe')
            }

        } catch (error) {
            console.log(error)
        }
    }


};
 
/*********Exportamos la clase ********/

module.exports = CartManager




