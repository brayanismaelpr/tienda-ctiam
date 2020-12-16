const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Tienda = require("./Tienda");
const Categoria = require("./Categoria");
const Marca = require("./Marca");
const Estado = require("./Estado");
const { query } = require("express");

const Product = sequelize.define(
    "producto",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_tienda: {
            type: DataTypes.INTEGER,
            references: {
                model: Tienda,
                key: "id",
            },
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            references: {
                model: Categoria,
                key: "id",
            },
        },
        id_marca: {
            type: DataTypes.INTEGER,
            references: {
                model: Marca,
                key: "id",
            },
        },
        id_estado: {
            type: DataTypes.INTEGER,
            references: {
                model: Estado,
                key: "id",
            },
        },
        titulo: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        detalle: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        visitas: {
            type: DataTypes.JSON(),
            defaultValue: JSON.stringify({
                visitas: [
                    {
                        fecha: `${new Date().getDate()}/${
                            new Date().getMonth() + 1
                        }/${new Date().getFullYear()}`,
                        contador: 0,
                    },
                ],
            }),
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
Product.getComment = async (id_product) =>
    await sequelize.query(
        `SELECT u.nombres AS nombre_usuario, res2.calificacion, res2.descripcion FROM usuario u INNER JOIN (SELECT c.id_usuario as userid, c.descripcion as descripcion, c.calificacion as calificacion FROM comentario c INNER JOIN (SELECT its.id as id FROM item_sale its WHERE its.id_producto = '${id_product}') AS res ON c.id_item = res.id) AS res2 ON u.id = res2.userid`,
        {
            type: QueryTypes.SELECT,
        }
    );
Product.getQuestion = async (id_product) =>
    await sequelize.query(
        `SELECT u.nombres , u.avatar, p.respuesta, p.pregunta, p.id FROM usuario u INNER JOIN pregunta p ON  p.id_usuario=u.id INNER JOIN producto pro ON p.id_producto = pro.id WHERE pro.id='${id_product}'`,
        {
            type: QueryTypes.SELECT,
        }
    );

Product.getSearch = async (search) =>
    await sequelize.query(
        `SELECT p.id,p.titulo,p.descripcion,p.detalle,p.precio,p.imagen,p.stock FROM producto p WHERE p.titulo LIKE '%${search}%' OR p.descripcion LIKE '%${search}%'`,
        {
            type: QueryTypes.SELECT,
        }
    );
Product.getRangeSearch = async (search) =>
    await sequelize.query(
        `SELECT MIN(p.precio) as menor, MAX(p.precio) as mayor FROM producto p WHERE p.titulo LIKE '%${search}%' OR p.descripcion LIKE '%${search}%'`,
        {
            type: QueryTypes.SELECT,
        }
    );
Product.getRange = async (id_categoria) =>
    await sequelize.query(
        `SELECT MIN(precio) as menor, MAX(precio) as mayor FROM producto WHERE id_categoria = ${id_categoria}`,
        {
            type: QueryTypes.SELECT,
        }
    );

module.exports = Product;
