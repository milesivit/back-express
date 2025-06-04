const {Venta, Usuario, Producto} = require('../models')

const getAllSells = async (req, res) =>{
    try {
        const ventas = await Venta.findAll({
            include:[Usuario, Producto]
        })

        res.json({status:200, data: ventas, message: 'ventas obtenidas de manera exitosa'})
    } catch (error) {
        res.status(500).json({message: 'no podes ser tan burro', error:error})
    }
}

module.exports = {
    getAllSells
}