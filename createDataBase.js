const mysql = require('mysql2/promise')

const crearBaseDeDatos = async () =>{
    
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'tu_contraseña'
        })
    
        //db si no existe
        await connection.query('CREATE DATABASE IF NOT EXISTS crud_db')
    
        console.log('la db se creo o ya existe')
    
        await connection.end()
        
    } catch (error) {
        console.error('hubo un error en la creacion de la db')
    }
    
}

crearBaseDeDatos();