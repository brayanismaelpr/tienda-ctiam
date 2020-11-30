const  { DataTypes } = require("sequelize");
const  { sequelize } = require("../database");
const ItemSale = require("./ItemSale");
const User = require("../models/Usuario");


const Comentary = sequelize.define(
    "comentario",{
        id :{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_item:{
            type : DataTypes.INTEGER,
            references:{
                model: ItemSale,
                key: "id",
        }},
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
        fecha : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue: DataTypes.NOW,
        },
        descripcion : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        calificacion: {
            type : DataTypes.DECIMAL(3,1),
            allowNull: false,
        } 
},
{
    freezeTableName : true,
    timestamps: false,

}
)

module.exports= Comentary;