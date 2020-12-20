const Product = require("../repository/models/Producto");

const { Store } = require("../repository/database").models;

module.exports = {
    updateAStore: async (req, res) => {
        const store = req.body;
        let storeDB = await Store.findByPk(req.user.id);
        if (store) {
            for (field in store) {
                storeDB[field] = store[field];
            }
            await storeDB.save();
            req.flash("success", "Tienda actualizada correctamente");
            return res.redirect("/seller/store");
        }
        req.flash("error", "Ha ocurrido un error inesperado");
        return res.redirect("/seller/store");
    },
    getQuestions: async (req, res) => {
        const questions = await Store.getQuestions(req.user.id);
        const store = await Store.findByPk(req.user.id);
        res.render("seller/questions", {
            title: "Mis preguntas | Mujeres CTIAM",
            user: req.user,
            store,
            isAuthenticated: true,
            questions,
        });
    },
    getStatistics: async (req, res) => {
        const id_tienda = req.user.id;
        const products = await Product.findAll({
            where:{
                id_tienda 
            }
        })
        res.render("seller/statistics", {
            title: "Mis estadisticas | Mujeres CTIAM",
            user: req.user,
            isAuthenticated: true,
            products,
        });
    },
    getChangeProduct: async (req,res)=>{
            const changes = await Store.getChangeProduct(req.user.id);
            res.render("seller/list-changes", {
                title: " Cambios | Mujeres CTIAM",
                user: req.user,
                changes,
                isAuthenticated: true,
            });
        },
    getReturnProduct: async (req,res)=>{
            const returns = await Store.getReturnProduct(req.user.id);
            res.render("seller/list-returns", {
                title: " Devoluciones | Mujeres CTIAM",
                user: req.user,
                returns,
                isAuthenticated: true,
            });
    },
};
