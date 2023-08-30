const express = require('express')

const productsRouter = require('../routes/products/products')
const notesRouter = require('../routes/notes/notes')

function routerApi(app) {
  const router_v1 = express.Router();
  const router_v2 = express.Router();

  app.use('/api/v1', router_v1)
  router_v1.use('/products', productsRouter)
  router_v1.use('/notes', notesRouter)

  app.use('/api/v2', router_v2)
  router_v2.use('/products', productsRouter)
  router_v2.use('/notes', notesRouter)
}

module.exports = routerApi
