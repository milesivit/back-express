const express = require('express')
const router = express.Router()
const {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/usuarios.controller')

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router