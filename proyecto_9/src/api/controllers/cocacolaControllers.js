const Cocacola = require('../models/cocacolaModels')
const products = require('../../../products.json')
const handleErr = (res, error) => {
  console.error(`Ha ocurrido un error: ${error}`)
  return res.status(500).json({ error: error.message, stack: error.stack })
}
const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Cocacola.find()
    return res.status(200).json(allProducts)
  } catch (error) {
    return handleErr(res, error)
  }
}
const postProducts = async (req, res, next) => {
  try {
    await Cocacola.insertMany(products)
    return res.status(201).json('All drinks added to the database!')
  } catch (error) {
    return handleErr(res, error)
  }
}
const updateProducts = async (req, res, next) => {
  try {
    const { id } = req.params
    const newProducto = new Cocacola(req.body)
    newProducto._id = id
    const updatedProduct = await Cocacola.findByIdAndUpdate(id, newProducto, {
      new: true
    })
    !updatedProduct
      ? res.status(404).json({ error: 'No se ha actualizado el producto' })
      : res.status(200).json(updatedProduct)
  } catch (error) {
    return handleErr(res, error)
  }
}
const deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params
    const productDeleted = await Cocacola.findByIdAndDelete(id)
    !productDeleted
      ? res.status(404).json({ error: 'No se ha  eliminado el producto' })
      : res.status(200).json({ msg: 'producto eliminado', productDeleted })
  } catch (error) {
    return handleErr(res, error)
  }
}
module.exports = {
  postProducts,
  getAllProducts,
  deleteProducts,
  updateProducts
}
