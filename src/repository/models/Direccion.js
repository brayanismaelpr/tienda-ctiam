const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const City = require("./Ciudad");
const User = require("./Usuario");

const Address = sequelize.define(
    "direccion",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
        id_ciudad: {
            type: DataTypes.INTEGER,
            references: {
                model: City,
                key: "id",
            },
        },
        barrio: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true,
        },
        avenida: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
    },
    { freezeTableName: true }
);

module.exports = Address;
