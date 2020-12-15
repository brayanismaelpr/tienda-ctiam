const bcrypt = require("bcrypt");
const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");

const User = sequelize.define(
    "usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombres: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagenPortada: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dni: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        telefono_alternativo: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_seller: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    { freezeTableName: true }
);
User.encryptPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
User.findNoSellers = async () =>
    await sequelize.query(
        `SELECT u.id, u.nombres, u.apellidos, u.dni, u.email, u.createdAt FROM usuario u where u.is_seller = "0"`,
        { type: QueryTypes.SELECT }
    );
User.findFavorites = async (userID) =>
    await sequelize.query(
        `SELECT p.id, p.titulo, p.precio, p.stock, p.imagen, f.id as id_favorito 
        FROM producto p 
            JOIN favorito f ON p.id = f.id_producto 
            JOIN usuario u ON u.id = f.id_usuario 
        WHERE f.id_usuario = ${userID}
        ORDER BY f.id  DESC`,
        { type: QueryTypes.SELECT }
    );
User.findCart = async (userID) =>
    await sequelize.query(
        `SELECT p.id as id_producto, p.imagen, p.titulo, m.nombre as marca, i.precio, i.cantidad, i.id as id_item
            FROM producto p 
                JOIN item_cart i ON p.id = i.id_producto
                JOIN carrito c ON c.id = i.id_carrito
                JOIN marca m ON m.id = p.id_marca
            WHERE c.id = ${userID}  
            ORDER BY i.id  DESC`,
        { type: QueryTypes.SELECT }
    );
User.getQuestions = async (userID) =>
    await sequelize.query(
        `SELECT t.imagen as imagen_tienda, t.id as id_tienda, p.titulo, p.imagen, p.precio, p.id as id_producto, pre.pregunta, pre.respuesta FROM producto p INNER JOIN pregunta pre ON p.id = pre.id_producto INNER JOIN tienda t ON t.id = p.id_tienda WHERE pre.id_usuario = ${userID}`,
        { type: QueryTypes.SELECT }
    );
User.getAddresses = async (userID) =>
    await sequelize.query(
        `SELECT d.id as id_direccion, d.barrio, d.avenida, d.calle, d.numero, c.nombre FROM direccion d INNER JOIN usuario u ON d.id_usuario = u.id INNER JOIN ciudad c ON d.id_ciudad = c.id WHERE u.id = ${userID}`,
        { type: QueryTypes.SELECT }
    );
User.getCartItems = async (userID) =>
    await sequelize.query(
        `SELECT p.id, p.titulo, p.imagen, p.id_tienda, ic.cantidad, ic.precio FROM producto p INNER JOIN item_cart ic ON ic.id_producto = p.id INNER JOIN usuario u ON u.id = ic.id_carrito WHERE u.id = ${userID}`,
        { type: QueryTypes.SELECT }
    );
User.getShoppings = async (userID) =>
    await sequelize.query(
        `SELECT COUNT(its.id_pedido) numero_items, p.id id_pedido, p.total, p.createdAt fecha_pedido FROM item_sale its INNER JOIN pedido p ON p.id = its.id_pedido INNER JOIN usuario u ON u.id = p.id_usuario WHERE u.id = ${userID} GROUP BY its.id_pedido
        `,
        { type: QueryTypes.SELECT }
    );
User.getBySale = async (saleID) =>
    await sequelize.query(
        `SELECT u.nombres, u.telefono, u.email FROM usuario u JOIN pedido p ON p.id_usuario = u.id JOIN venta v ON v.id_pedido = p.id WHERE v.id = ${saleID}
        `,
        { type: QueryTypes.SELECT }
    );
User.getPurchasedProducts = async (userID) =>
    await sequelize.query(
        `SELECT p.id, p.titulo FROM producto p JOIN item_sale its ON its.id_producto = p.id JOIN pedido ped ON ped.id = its.id_pedido JOIN usuario u ON u.id = ped.id_usuario WHERE u.id = ${userID}`,
        { type: QueryTypes.SELECT }
    );
User.getReturns = async (userID) =>
    await sequelize.query(
        `SELECT t.nombre tienda, p.titulo producto, dev.id_item FROM devolucion dev JOIN producto p ON p.id = dev.id_producto JOIN tienda t ON t.id = p.id_tienda WHERE dev.id_usuario = ${userID}`,
        { type: QueryTypes.SELECT }
    );

module.exports = User;
