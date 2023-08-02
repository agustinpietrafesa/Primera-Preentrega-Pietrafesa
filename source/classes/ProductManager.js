const fs = require('fs')

class ProductManager {
    path
    products

    constructor(){
        this.products = []
        this.path = './files/Products.JSON'

    };
    productId = 0 

    
    /*********Metodo que retorna toda la lista de los productos que haya hasta el momento *******/
    async getProducts() {
        try {
            if(fs.existsSync(this.path)){ 
                const data = await fs.promises.readFile(this.path, 'utf-8')
                this.products = JSON.parse(data)
                return this.products ? this.products : []
            }else{
                return []
            };            
        } catch (error) {
            console.log(error)
        }    

    }  
    /*********Metodo para agregar productos nuevos la lista *************/
    async addProduct(newProduct) {

        
        try {
            this.getProducts()
            console.log(this.products.length)
            this.productId = Number([this.products.length]) + 1 
            
            newProduct.id = this.productId++
            /*******Generamos la obligatoriedad de los parametros  *********/
            const allParams = [
                newProduct.title,
                newProduct.description, 
                newProduct.code, 
                newProduct.price, 
                newProduct.state, 
                newProduct.stock,
                newProduct.thumbnails, 
                newProduct.category,
                ]
                
                    
                
                const reqParams = allParams.every(value => value);
                
                if ( !reqParams ){
                    console.warn('Todos los parametros deben completarse')
                    return;
            }
            /********Generamos la singulairdad del code ******/
            
            const checkCode = this.products.find(productCode => productCode.code === newProduct.code)




            if(checkCode) {
                console.log(`El producto con el codigo ${checkCode.code} ya esta ingresado en el sistema.`)
            } else {           
                this.products.push(newProduct);
                console.log(this.products)
            }
            
    
            /**************Escribimos el archivo JSON con los datos de los productos *******/
             await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            
            
        } catch (error) {
            console.log(error)
        }

     };

    /*********metodo que busca producto mediante un ID pasado como parametro ******/
    async getProductById(id) {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const ourProducts = JSON.parse(data)
                const productoBuscado = ourProducts.find(product => product.id === id)
                productoBuscado ? console.log(productoBuscado) : console.log('Product Not Found');
            }else{
                console.log('Lo siento algo salio mal')
            };         

        } catch (error) {
            console.log(error)
        }

    }

    /************Metodo que busca un producto por el id y modifica uno o todos sus campos ******/

    async updateProduct(id, campo, valor){
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const ourProducts = JSON.parse(data)
                const productoBuscado = ourProducts.find(product => product.id === id)
                await this.deleteProduct(id)
                let key = campo
                productoBuscado[key] = valor
                productoBuscado ? this.products.push(productoBuscado) : console.log('Product Not Found');
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))

            }else{
                console.log('Lo siento algo salio mal')
            };         
 
        } catch (error) {
            console.log(error)
        }


    }

    /**************Metodo que busca un producto por su id y lo elimina del array ***************/

    async deleteProduct(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const ourProducts = JSON.parse(data)
        const productIndex = ourProducts.findIndex(product => product.id === id)

        productIndex < 0 
        ?
        console.log('No se encuentra el producto que desea eliminar')
        :
        ourProducts.splice(productIndex, 1); 
        this.products = await ourProducts
        const datos1 = await fs.promises.writeFile(this.path, JSON.stringify(this.products))

    }


};
 
/*********Exportamos la clase ********/

module.exports = ProductManager




