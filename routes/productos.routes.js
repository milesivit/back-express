const express = require('express')
const router = express.Router()
const {
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productos.controller')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router