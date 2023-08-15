const socket = io()

const form = document.getElementById('addProductForm')


form.addEventListener('submit', evt => {
    evt.preventDefault()

    const data = new FormData(form)

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const category = document.getElementById('category').value
    
    
    
    const newProduct = {
        title,
        description,
        code,
        price,
        category,
        state: true,
        thumbnails: 'No image'
    }

    console.log(newProduct)

})