const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const User = require("./Usuario");
const Product = require("./Producto");
const ItemSale = require("./ItemSale");
const Return = sequelize.define(
    "devolucion",
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
        id_item: {
            type: DataTypes.INTEGER,
            references: {
                model: ItemSale,
                key: "id",
            },
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        evidencia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
module.exports = Return;
