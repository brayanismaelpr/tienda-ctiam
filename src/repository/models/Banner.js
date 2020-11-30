const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Banner = sequelize.define(
    "banner",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
        },
        titulo: { 
            type: DataTypes.STRING(50),
            allowNull : false,
        
        },
        descripcion: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        boton: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        fotografia:{
            type : DataTypes.STRING(120),
            allowNull: false,
        },
        color_fondo: {
            type : DataTypes.STRING(10),
            allowNull:false,
        }
    },
    {
        freezeTableName: true,
    }

);
module.exports = Banner;