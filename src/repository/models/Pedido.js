const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const User = require("./Usuario");

const Order = sequelize.define(
    "pedido",
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
        total: {
            type: DataTypes.DOUBLE,
        },
    },
    { freezeTableName: true, }
);

module.exports = Order;
