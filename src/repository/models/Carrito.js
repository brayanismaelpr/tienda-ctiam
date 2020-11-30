const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const User = require("./Usuario");

const Cart = sequelize.define(
    "carrito",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key: "id",
            },
        },
        valor_total: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Cart;
