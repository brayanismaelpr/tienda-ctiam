const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const City = sequelize.define(
    "ciudad",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
    },
    { freezeTableName: true, timestamps: false }
);

module.exports = City;
