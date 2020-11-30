const {
    Comentary,
    ItemSale,
    Product,
    Photography,
    Store,
    Question,
} = require("../repository/database").models;
const { Op } = require("sequelize");

module.exports = {
    getProduct: async (req, res) => {
        const id_producto = req.params.id;
        const product = await Product.findByPk(id_producto);
        const id_categoria = product.id_categoria;
        const store = await Store.findByPk(product.id_tienda);
        const photography = await Photography.findAll({
            where: {
                id_producto,
            },
        });
        const comments = await Product.getComment(id_producto);
        comments.forEach((element) => {
            element.restante = 5 - Number(element.calificacion);
        });
        const questions = await Product.getQuestion(id_producto);
        const categorys = await Product.findAll({
            where: {
                id_categoria,
                [Op.not]: [{ id: id_producto }],
            },
            limit: 6,
        });
        const isown =
            req.user && req.user.id == product.id_tienda ? true : false;
        if (product) {
            return res.render("view-product", {
                title: `${product.titulo} | Mujeres CTIAM`,
                user: req.user,
                isAuthenticated: req.user !== undefined,
                product,
                store,
                photography,
                categorys,
                comments,
                questions,
                isown,
            });
        }
        res.redirect("/");
    },
    makeQuestion: async (req, res) => {
        const { id_producto, pregunta } = req.body;
        const id_usuario = req.user.id;
        const question = await Question.create({
            id_producto,
            id_usuario,
            pregunta,
        });
        if (question) {
            res.redirect(`/product/${id_producto}`);
        }
        res.redirect(`/product/${id_producto}`);
    },
    responseQuestion: async (req, res) => {
        const { id_pregunta, respuesta } = req.body;
        const question = await Question.findByPk(id_pregunta);
        if (question) {
            question["respuesta"] = respuesta;
            await question.save();
            res.redirect(`/store/questions`);
        }
        res.redirect(`/product/${id_producto}`);
    },
};
