const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Producto = require("./Producto");
const Pedido = require("./Pedido");
const Venta = require("./Venta");

const Item = sequelize.define(
    "item_sale",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pedido: {
            type: DataTypes.INTEGER,
            references: {
                model: Pedido,
                key: "id",
            },
        },
        id_producto: {
            type: DataTypes.UUID,
            references: {
                model: Producto,
                key: "id",
            },
        },
        id_venta: {
            type: DataTypes.INTEGER,
            references: {
                model: Venta,
                key: "id",
            },
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
Item.getBySale = async (idSale) =>
    await sequelize.query(
        `SELECT p.titulo, p.precio, p.imagen, its.cantidad, its.precio FROM producto p JOIN item_sale its ON its.id_producto = p.id JOIN venta v on V.id = its.id_venta WHERE v.id = ${idSale}
        `,
        { type: QueryTypes.SELECT }
    );
module.exports = Item;
