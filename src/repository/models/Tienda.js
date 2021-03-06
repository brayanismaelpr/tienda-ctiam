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
        imagenPortada: {
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
Store.getProducts = async (storeID) =>
    await sequelize.query(
        `SELECT p.id, p.titulo, p.precio, p.stock, m.nombre as marca, c.nombre as categoria, e.estado FROM producto p INNER JOIN categoria c ON c.id = p.id_categoria INNER JOIN estado e ON e.id = p.id_estado INNER JOIN marca m ON m.id = p.id_marca WHERE p.id_tienda = ${storeID}`,
        { type: QueryTypes.SELECT }
    );
Store.getSales = async (storeID) =>
    await sequelize.query(
        `SELECT COUNT(its.id_venta) numero_items, v.id id_venta, v.total, v.fecha FROM item_sale its INNER JOIN venta v ON v.id = its.id_venta INNER JOIN tienda t ON t.id = v.id_tienda WHERE t.id = ${storeID} GROUP BY its.id_venta  
        ORDER BY v.fecha DESC
        `,
        { type: QueryTypes.SELECT }
    );
Store.getSaleslimit = async (storeID) =>
    await sequelize.query(
        `SELECT COUNT(its.id_venta) numero_items, v.id id_venta, v.total, v.fecha FROM item_sale its INNER JOIN venta v ON v.id = its.id_venta INNER JOIN tienda t ON t.id = v.id_tienda WHERE t.id = ${storeID} GROUP BY its.id_venta  
        ORDER BY v.fecha DESC LIMIT 6
        `,
        { type: QueryTypes.SELECT }
    );
 Store.getChangeProduct = async (storeID)=>
 await sequelize.query(
    `SELECT cam.id id,t.nombre tienda, p.titulo producto, u.nombres usuario,cam.id_item ,cam.motivo, cam.evidencia FROM cambio cam JOIN producto p ON p.id = cam.id_producto JOIN tienda t ON t.id = p.id_tienda JOIN usuario u ON u.id = cam.id_usuario WHERE t.id = ${storeID}
    `,
    { type: QueryTypes.SELECT }
);  

Store.getReturnProduct = async (storeID)=>
 await sequelize.query(
    `SELECT dev.id id, t.nombre tienda, p.titulo producto,u.nombres usuario, dev.id_item ,dev.motivo, dev.evidencia FROM devolucion dev JOIN producto p ON p.id = dev.id_producto JOIN tienda t ON t.id = p.id_tienda JOIN usuario u ON u.id= dev.id_usuario WHERE t.id = ${storeID}
    `,
    { type: QueryTypes.SELECT }
);  

Store.getReturnProductDetails = async (devId)=>
 await sequelize.query(
    `SELECT dev.id id, t.nombre tienda, p.titulo producto,p.id id_product,u.nombres usuario, dev.id_item , isale.cantidad cantidad,dev.motivo, dev.evidencia FROM devolucion dev JOIN producto p ON p.id = dev.id_producto JOIN tienda t ON t.id = p.id_tienda JOIN usuario u ON u.id= dev.id_usuario INNER JOIN item_sale isale ON dev.id_item=isale.id WHERE dev.id = ${devId}
    `,
    { type: QueryTypes.SELECT }
);

Store.getChangeProductDetails = async (camId)=>
 await sequelize.query(
    `SELECT cam.id id, t.nombre tienda, p.titulo producto,p.id id_product,u.nombres usuario, cam.id_item , isale.cantidad cantidad,cam.motivo, cam.evidencia FROM cambio cam JOIN producto p ON p.id = cam.id_producto JOIN tienda t ON t.id = p.id_tienda JOIN usuario u ON u.id= cam.id_usuario INNER JOIN item_sale isale ON cam.id_item=isale.id WHERE cam.id = ${camId}
    `,
    { type: QueryTypes.SELECT }
);
module.exports = Store;
