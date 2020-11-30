const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Store = require("./Tienda");
const Order = require("./Pedido");


const Sale = sequelize.define(
    "venta",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        id_tienda: {
            type: DataTypes.INTEGER,
            references : {
                model : Store,
                key : "id",
            },
        },
        id_pedido:{
            type : DataTypes.INTEGER,
            references : {
                model : Order,
                key : "id",
            },
        },
        total : {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        fecha : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        freezeTableName : true,
        timestamps: false,
    }
);

module.exports = Sale;