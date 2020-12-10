const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Cart = require("./Carrito");
const Producto = require("./Producto");

const ItemCart = sequelize.define(
  "item_cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_carrito: {
      type: DataTypes.INTEGER,
      references: {
        model: Cart,
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
ItemCart.deleteItems = async (userID) =>
  await sequelize.query(`DELETE FROM item_cart WHERE id_carrito = ${userID}`, { type: QueryTypes.SELECT });
module.exports = ItemCart;
