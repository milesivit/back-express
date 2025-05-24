const { json } = require('express')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/productos.json')

const leerProductos = () => {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data);
}

let productos = leerProductos();

const escribirProductos = (productos) =>{
    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2))
}

const getProducts = (req, res)=>{
    res.json({data: productos
        ,status: 200
        ,message: 'los productos han sido obtenidos de manera axitosa'
    })
}

const getProductById = (req, res) => {
    const producto = productos.find(item => item.id === parseInt(req.params.id))
    console.log(producto)
    if (!producto) return res.json({ status: 400, message: 'producto no encontrado' })
        res.json({ data: producto, status: 200, message: 'producto encontrado' })
}

const createProduct = (req, res) => {
    const { nombre, precio } = req.body;

    // validaciones basicas
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ status: 400, message: 'El nombre no puede estar vacío.' });
    }

    // crear el nuevo usuario
    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio,
    };

    productos.push(nuevoProducto);
    escribirProductos(productos)
    res.status(201).json({ status: 201, data: nuevoProducto, message: 'Producto creado exitosamente' });
};


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
