const { json } = require('express')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/usuarios.json')

const leerUsuario = () => {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data);
}

let usuarios = leerUsuario();

const escribirUsuarios = (usuarios) =>{
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2))
}

const getUsers = (req, res)=>{
    res.json({data: usuarios
        ,status: 200
        ,message: 'los usuarios han sido obtenidos de manera axitosa'
    })
}

const getUserById = (req, res) => {
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    console.log(usuario)
    if (!usuario) return res.json({ status: 400, message: 'usuario no encontrado' })
        res.json({ data: usuario, status: 200, message: 'usuario encontrado' })
}

const createUser = (req, res) => {
    const { nombre, contrasenia, email, edad } = req.body;

    // validaciones basicas
    if (!email || email.trim() === '') {
        return res.status(400).json({ status: 400, message: 'El email no puede estar vacío.' });
    }

    // verificar si el email ya existe 
    const emailExistente = usuarios.some(user => user.email.toLowerCase() === email.toLowerCase());
    if (emailExistente) {
        return res.status(400).json({ status: 400, message: 'El email ya está registrado.' });
    }

    // crear el nuevo usuario
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        contrasenia,
        email,
        edad
    };

    usuarios.push(nuevoUsuario);
    escribirUsuarios(usuarios)
    res.status(201).json({ status: 201, data: nuevoUsuario, message: 'Usuario creado exitosamente' });
};


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
