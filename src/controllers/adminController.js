const { User, Store, Product } = require("../repository/database").models;

module.exports = {
    findNoSellers: async (req, res) => {
        const users = await User.findNoSellers();
        res.render("admin/list-users", {
            users,
        });
    },
    makeSeller: async (req, res) => {
        const idUser = req.params.id;
        const userDB = await User.findByPk(idUser);
        if (userDB) {
            const { id, telefono, email } = userDB;
            const tienda = await Store.create({
                id,
                nombre: "Nombre de la tienda",
                descripcion: "Descripción de la tienda",
                telefono,
                email,
            });
            if (tienda) {
                userDB.is_seller = 1;
                await userDB.save().then(() => {
                    req.flash("success", "Tienda creada correctamente");
                    return res.redirect("/admin/user-list");
                });
            }
            req.flash("error", "Ha ocurrido un error inesperado");
            return res.redirect("/admin/user-list");
        }
        req.flash("error", "No se encontró al usuario");
        return res.redirect("/admin/user-list");
    },
    changeProductState: async (req, res) => {
        const { id_producto, estado } = req.body;
        const producto = await Product.findByPk(id_producto);
        if (producto) {
            producto.id_estado = estado;
            producto.save();
            req.flash("success", "Estado actualizado correctamente");
            return res.redirect("/admin/revision-products");
        }
        req.flash("error", "No se encontró el producto");
        return res.redirect("/admin/revision-products");
    },
};
