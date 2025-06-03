const { json } = require('express')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/productos.json')

const { Producto } = require('../models');
const { measureMemory } = require('vm');

const leerProductos = () => {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data);
}

let productos = leerProductos();

const escribirProductos = (productos) =>{
    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2))
}

const getProducts = async (req, res) => {
    try {
      const productos = await Producto.findAll();
      res.json({
        data: productos,
        status: 200,
        message: 'Productos obtenidos de manera exitosa'
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({
        message: error.message || 'Error interno del servidor'
      });
    }
  };
  
  const getProductById = async (req, res) =>{
    try {
        const producto = await Producto.findByPk(req.params.id)
        if (!producto) {
            return res.status(404).json({ message: 'producto no encontrado'})
        } else {
            res.json({data: producto, status: 200, message: 'producto encontrado' })
        }
    } catch (error) {
        console.error('Error al obtener producto id:', error);
        res.status(500).json({
          message: error.message || 'Error interno del servidor'
        });
    }
  }

  const createProduct = async (req, res) => {
    const {nombre, precio} = req.body

    try {
        if (!nombre || !precio) {
                return res.status(400).json({ message: 'faltan datos obligatorios'})
        }
        const nuevoProducto = await Producto.create({nombre, precio})
        res.status(201).json({message: 'producto creado satisfactoriamente', data: nuevoProducto })
    } catch (error) {
        console.error('Error al crear producto :', error);
        res.status(500).json({
          message: error.message || 'Error interno del servidor'
        });
    }
  }

const updateProduct = (req, res) =>{
    const producto = productos.find(item => item.id === parseInt(req.params.id))
    if (!producto) return res.json({ status: 400, message: 'producto no encontrado' })
    const {nombre, precio} = req.body
    producto.nombre = nombre || producto.nombre
    producto.precio = precio || producto.precio

    escribirProductos(productos)

    res.json({ status: 201, message: 'producto editado exitosamente'})

}

const deleteProduct = (req, res) =>{
    let producto = productos.find(item => item.id === parseInt(req.params.id))
    console.log(producto);

    if (!producto) return res.json({ status: 404, message: 'producto no encontrado' })
    productos = productos.filter(item => item.id !== producto.id)

    escribirProductos(productos)

    res.json({ status: 201, message: 'producto eliminado correctamente'})
}

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}
