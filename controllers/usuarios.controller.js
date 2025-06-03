const { json } = require('express')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/usuarios.json')

const { Usuario } = require('../models');

const leerUsuario = () => {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data);
}

let usuarios = leerUsuario();

const escribirUsuarios = (usuarios) =>{
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2))
}

const getUsers = async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json({
        data: usuarios,
        status: 200,
        message: 'usuarios obtenidos de manera exitosa'
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        message: error.message || 'Error interno del servidor'
      });
    }
  };

const getUserById = async (req, res) =>{
    try {
        const usuario = await Usuario.findByPk(req.params.id)
        if (!usuario) {
            return res.status(404).json({ message: 'usuario no encontrado'})
        } else {
            res.json({data: usuario, status: 200, message: 'usuario encontrado' })
        }
    } catch (error) {
        console.error('Error al obtener usuario id:', error);
        res.status(500).json({
          message: error.message || 'Error interno del servidor'
        });
    }
  }

  const createUser = async (req, res) => {
    const {nombre, email, edad} = req.body

    try {
        if (!nombre || !email || !edad) {
                return res.status(400).json({ message: 'faltan datos obligatorios'})
        }
        const nuevoUsuario = await Usuario.create({nombre, email, edad})
        res.status(201).json({message: 'usuario creado satisfactoriamente', data: nuevoUsuario })
    } catch (error) {
        console.error('Error al crear usuario :', error);
        res.status(500).json({
          message: error.message || 'Error interno del servidor'
        });
    }
  }

// const createUser = (req, res) => {
//     const { nombre, contrasenia, email, edad } = req.body;

//     // validaciones basicas
//     if (!email || email.trim() === '') {
//         return res.status(400).json({ status: 400, message: 'El email no puede estar vacío.' });
//     }

//     // verificar si el email ya existe 
//     const emailExistente = usuarios.some(user => user.email.toLowerCase() === email.toLowerCase());
//     if (emailExistente) {
//         return res.status(400).json({ status: 400, message: 'El email ya está registrado.' });
//     }

//     // crear el nuevo usuario
//     const nuevoUsuario = {
//         id: usuarios.length + 1,
//         nombre,
//         contrasenia,
//         email,
//         edad
//     };

//     usuarios.push(nuevoUsuario);
//     escribirUsuarios(usuarios)
//     res.status(201).json({ status: 201, data: nuevoUsuario, message: 'Usuario creado exitosamente' });
// };


const updateUser = (req, res) =>{
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if (!usuario) return res.json({ status: 400, message: 'usuario no encontrado' })
    const {nombre, contrasenia, email, edad} = req.body
    usuario.nombre = nombre || usuario.nombre
    usuario.contrasenia = contrasenia || usuario.contrasenia
    usuario.email = email || usuario.email
    usuario.edad = edad || usuario.edad

    escribirUsuarios(usuarios)

    res.json({ status: 201, message: 'usuario editado exitosamente'})

}

const deleteUser = (req, res) =>{
    let usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    console.log(usuario);

    if (!usuario) return res.json({ status: 404, message: 'usuario no encontrado' })
    usuarios = usuarios.filter(item => item.id !== usuario.id)

    escribirUsuarios(usuarios)

    res.json({ status: 201, message: 'usuario eliminado correctamente'})
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    createUser,
    updateUser
}
