const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const State = sequelize.define(
    "estado",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
    },
    { freezeTableName: true, timestamps: false }
);

module.exports = State;
