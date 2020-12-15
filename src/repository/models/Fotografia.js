const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Product = require("./Producto");

const Photography = sequelize.define(
    "fotografia",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_producto: {
            type: DataTypes.UUID,
            references: {
                model: Product,
                key: "id",
            },
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Photography;
