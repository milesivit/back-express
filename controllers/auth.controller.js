const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

//registrar nuevo usuario
const register = async (req, res) => {
        
    const { nombre, email, edad, contrasenia, role} = req.body;                
    
    try {
        const userExist = await Usuario.findOne({
            where: {
                email
            }
        });

        if (userExist) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashContrasenia = await bcrypt.hash(contrasenia, 10);
        const user = await Usuario.create({
            nombre,
            email,
            edad,
            contrasenia: hashContrasenia,
            role: role || 'cliente'
        })

        res.status(201).json({ message: 'Usuario creado exitosamente', data: user });
    } catch (error) {
        console.error('Error al crear usuario :', error);
        res.status(500).json({
            message: error.message || 'Error interno del servidor'
        });
        
    }
}

const login = async (req, res) => {
    const { email, contrasenia } = req.body;

    try {
        const user = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        const isPasswordValid = await bcrypt.compare(contrasenia, user.contrasenia);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'secreto1234', { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({
            message: error.message || 'Error interno del servidor'
        }); 
    }
}

module.exports = { register, login };