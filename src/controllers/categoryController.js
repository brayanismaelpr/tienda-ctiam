const { Category } = require("../repository/database").models;

module.exports = {
    getCategorys: async () => {
        return await Category.findAll();
    },
    createACategory: async (req, res) => {
        const { nombre, descripcion } = req.body;
        const categorys = await Category.create({
            nombre,
            descripcion,
        });
        if (categorys) {
            req.flash("success", "Se ha creado correctamente la categoría");
            return res.redirect("/admin/categorys");
        }
        req.flash("error", "No se ha podido crear la categoría");
        return res.redirect("/admin/categorys");
    },
    updateACategory: async (req, res) => {
        const categoryDB = await Category.findByPk(req.params.id);
        const category = req.body;
        for (field in category) {
            categoryDB[field] = category[field];
        }
        try{
            await categoryDB.save();
            req.flash("success", "Se ha actualizado la categoria correctamente");
            return res.redirect("/admin/categorys");
        }catch(e){
            req.flash("error", "Ha ocurrido un error inesperado");
            return res.redirect("/admin/categorys");
        }
    },
    deleteACategory: async (req, res) => {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            category.destroy();
            req.flash("success", "Se ha eliminado correctamente la categoría!");
            return res.redirect("/admin/categorys");
        }
        req.flash(
            "error",
            "La categoría que ha intentado eliminar no  existe!"
        );
        return res.redirect("/admin/categorys");
    },
};
