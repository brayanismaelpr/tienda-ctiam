const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const User = require("./Usuario");

const Store = sequelize.define(
    "tienda",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key: "id",
            },
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
        },
        pagina_web: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { freezeTableName: true }
);
Store.getQuestions = async (storeID) =>
    await sequelize.query(
        `SELECT pro.id as id_producto, pro.titulo, pro.descripcion, pro.imagen as imagen_producto, pro.precio, pre.id as id_pregunta, u.nombres as nombre_usuario, u.avatar as imagen_usuario, pre.pregunta, pre.respuesta FROM pregunta pre INNER JOIN producto pro ON pre.id_producto = pro.id INNER JOIN usuario u ON u.id = pre.id_usuario INNER JOIN tienda t ON pro.id_tienda = t.id WHERE t.id = ${storeID}`,
        { type: QueryTypes.SELECT }
    );

module.exports = Store;
