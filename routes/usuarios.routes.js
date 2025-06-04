const express = require('express')
const router = express.Router()
const {
    getUserById,
    getUsers,
    createUser,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuarios.controller')

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUsuario)
router.delete('/:id', deleteUsuario)

module.exports = router