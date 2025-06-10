const {Venta, Usuario, Producto} = require('../models')

const getAllSells = async (req, res) =>{
    try {
        const ventas = await Venta.findAll({
            attributes: ['id', 'total', 'cantidad', 'fecha'],
            include:[
                {
                    model:Usuario, 
                    attributes:['nombre','email']
                },
                {
                    model:Producto, 
                    attributes:['nombre','precio']
                }]
        })

        res.json({status:200, data: ventas, message: 'ventas obtenidas de manera exitosa'})
    } catch (error) {
        res.status(500).json({message: 'no podes ser tan burro', error:error})
    }
}

const getSaleById = async (req, res) =>{
    try {
        const venta = await Venta.findByPk(req.params.id,{
            include: [Usuario, Producto]
        })

        if (!venta) return res.status(404).json({message:'venta no encontrada'})
        res.json({status:200, data:venta, message:'venta obtenida exitosamente'})
    } catch (error) {
      res.status(500).json({message:'error al obtener venta solicitada', error: error})
    }
}

const createSale = async (req, res) =>{
    const {usuarioId, productoId, cantidad, total, fecha} = req.body
    try {
        if (!usuarioId || !productoId || !cantidad || !total || !fecha) {
            return res.status(404).json({message:'faltan campos obligatorios'})
        }

        const newSale = await Venta.create({usuarioId, productoId, cantidad, total, fecha})
        res.json({status:201, message:'venta registrada exitosamente', date:newSale})
    } catch (error) {
        res.status(500).json({message:'error al crear venta', error: error})
    }
}

const updateSale = async (req, res) =>{
    try {
        const sale = await Venta.findByPk(req.params.id)
        if (!sale) return res.status(404).json({message:'venta no encontrada'})

        const {usuarioId, productoId, cantidad, total, fecha} = req.body

        sale.usuarioId = usuarioId || sale.usuarioId
        sale.productoId = productoId || sale.productoId
        sale.cantidad = cantidad || sale.cantidad
        sale.total = total || sale.total
        sale.fecha = fecha || sale.fecha

        await sale.save()
        res.json({status:201, message:'venta actualizada exitosamente', date:sale})
    } catch (error) {
        res.status(500).json({message:'error al actualizar venta', error: error})
    }
}

const deleteSale = async (req, res) =>{
    try {
        const sale = await Venta.findByPk(req.params.id);
        if (!sale) {
            return res.status(404).json({ status: 404, message: 'venta no encontrada'});
        }
  
        await sale.destroy();
  
        res.status(200).json({ status: 200, message: 'venta eliminado exitosamente', date:sale});
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar venta', error: error.message });
    }
}

module.exports = {
    getAllSells,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
}