const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Subscription = sequelize.define(
    "subscripcion",
    {
        correo: {
            type: DataTypes.STRING(60),
            allowNull:false,
            primaryKey: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Subscription;
