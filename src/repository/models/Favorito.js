const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Producto = require("../models/Producto");
const User = require("../models/Usuario");

const Favorite = sequelize.define(
    "favorito",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_producto: {
            type: DataTypes.UUID,
            references: {
                model: Producto,
                key: "id",
            },
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    { freezeTableName: true, timestamps: false }
);

module.exports = Favorite;
