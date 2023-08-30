const express  = require('express')
const ProductService = require('../../services/product.service')

const router = express.Router()
const service = new ProductService();

//** Obtener todos los productos **//
router.get('/', (req, res) => {
  const products = service.find();
  res.json(products)
})

//** Buscar un producto por id **//
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = service.findOne(id)

  if (product){
    res.json(product)
  }
  else{
    res.send("<h1>404</h1>").status(404).end
    console.log("404")
  }

})

//** Crear un nuevo producto **//
router.post('/', (req, res) => {
  const body = req.body

  if (!body){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const product = service.create(body)
  res.json(product)
})


module.exports = router;
