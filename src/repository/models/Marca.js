const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Pedido = require("./Pedido");

const LandMark = sequelize.define(
    "marca",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    { freezeTableName: true, timestamps: false }
);

module.exports = LandMark;
