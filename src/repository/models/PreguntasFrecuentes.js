const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const FrequentQuestions = sequelize.define(
    "preguntas_frecuentes",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pregunta: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        respuesta: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
module.exports = FrequentQuestions;
