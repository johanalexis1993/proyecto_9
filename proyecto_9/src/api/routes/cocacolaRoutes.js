const {
  postProducts,
  getAllProducts,
  updateProducts,
  deleteProducts
} = require('../controllers/cocacolaControllers')
const productsRouter = require('express').Router()
productsRouter.post('/getProducts', postProducts)
productsRouter.get('/', getAllProducts)
productsRouter.put('/:id', updateProducts)
productsRouter.delete('/:id', deleteProducts)
module.exports = productsRouter
