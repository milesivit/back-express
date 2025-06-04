const express = require('express')
const router = express.Router()
const {getAllSells} = require('../controllers/venta.controller') 

router.get('/', getAllSells)

module.exports= router