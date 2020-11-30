const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const User = require("./Usuario");
const Product = require("./Producto");

const Question = sequelize.define(
    "pregunta",
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
        id_producto: {
            type: DataTypes.UUID,
            references: {
                model: Product,
                key: "id",
            },
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        pregunta: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        respuesta: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
module.exports = Question;
