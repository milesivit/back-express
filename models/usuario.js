'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Venta,{foreignKey:'usuarioId'})
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    contrasenia: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'moderador', 'cliente'),
      allowNull: false,
      defaultValue: 'cliente'
    } 
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};