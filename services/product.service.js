const productsData = require('../data/products.json')

class ProductService {

    constructor(){
      this.products = [];
      this.generate();
    }

    generate(){
      productsData.forEach((product) => this.products.push(product))
    }

    create(body){

      const generateId = () => {
        const maxId = this.products.length > 0
          ? Math.max(...this.products.map(n => n.id))
          :0
        return maxId + 1
      }

      const data = {
        id: generateId(),
        nombre: body.nombre,
        descripcion: body.descripcion,
        precio: body.precio,
        stock: body.stock
      }

      this.products.push(data)
      return(data)
    }

    find(){
      return this.products;
    }

    findOne(id){
      const product = this.products.find(product => product.id === id)
      return product
    }

    Update(){

    }

    delete(){

    }

}

module.exports = ProductService
