const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Category = sequelize.define(
    "categoria",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
    },
    { freezeTableName: true, timestamps: false }
);

module.exports = Category;
