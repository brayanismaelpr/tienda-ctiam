const { Product, Photography } = require("../repository/database").models;

module.exports = {
    createProduct: async (req, res) => {
        const {
            id_categoria,
            id_marca,
            titulo,
            descripcion,
            detalle,
            precio,
            stock,
            imagen,
            images,
        } = req.body;
        const product = await Product.create({
            id_tienda: req.user.id,
            id_categoria,
            id_marca,
            titulo,
            descripcion,
            detalle,
            precio,
            stock,
            imagen,
            id_estado: 1,
        });
        if (product) {
            images.forEach(async (element) => {
                Photography.create({ id_producto: product.id, url: element });
            });
            req.flash("success", "Producto creado correctamente!");
            return res.redirect("/seller/store");
        }
        console.log("No producto");
        req.flash("error", "Error al crear el producto, pruebe más tarde");
        return res.redirect("/seller/store");
    },
    deleteProduct: async (req, res) => {
        const { id_producto } = req.body;
        const product = await Product.findByPk(id_producto);
        if (product) {
            await product.destroy();
            req.flash("success", "Producto eliminado correctamente");
            return res.redirect("/seller/my-products");
        }
        req.flash(
            "error",
            "No se ha encontrado el producto que desea eliminar"
        );
        return res.redirect("/seller/my-products");
    },
};
