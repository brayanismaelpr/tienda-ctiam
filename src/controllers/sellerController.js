const {
    Category,
    LandMark,
    Product,
    Photography,
    State,
    Store,
} = require("../repository/database").models;
const { Op } = require("sequelize");

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
                await Photography.create({
                    id_producto: product.id,
                    url: element,
                });
            });
            return res.json({ ok: true });
        }
        return res.json({ ok: false });
    },
    updateProduct: async (req, res) => {
        const {
            id_producto,
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
        console.log(
            id_producto,
            id_categoria,
            id_marca,
            titulo,
            descripcion,
            detalle,
            precio,
            stock,
            imagen,
            images
        );
        // if (product) {
        //     images.forEach(async (element) => {
        //         await Photography.create({
        //             id_producto: product.id,
        //             url: element,
        //         });
        //     });
        //     return res.json({ ok: true });
        // }
        return res.json({ ok: false });
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
    getProducts: async (req, res) => {
        const user = req.user;
        const store = await Store.findByPk(user.id);
        const products = await Store.getProducts(user.id);
        const states = await State.findAll({
            where: {
                [Op.not]: [{ id: [1, 5] }],
            },
        });
        res.render("seller/manageProduct", {
            title: `Mis productos | Mujeres CTIAM`,
            user,
            products,
            states,
            store: store.dataValues,
            isAuthenticated: true,
        });
    },
    updateProducts: async (req, res) => {
        const data = req.body;
        if (data.idProduct) {
            if (typeof data.idProduct != "string") {
                data.idProduct.map(async (item) => {
                    let product = await Product.findByPk(item);
                    console.log(product.id_estado);
                    if (product.id_estado != 1) {
                        product.id_estado = Number(data.id_estado);
                        await product.save();
                    }
                });
                return res.redirect("/seller/my-products");
            }
            let product = await Product.findByPk(data.idProduct);
            if (product.id_estado != 1) {
                product.id_estado = Number(data.id_estado);
                await product.save();
                product.id_estado = Number(data.id_estado);
                await product.save();
            }
            return res.redirect("/seller/my-products");
        }
        return res.redirect("/seller/my-products");
    },
    editFind: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            const category = await Category.findByPk(product.id_categoria, {
                attributes: ["nombre", "id"],
            });
            const mark = await LandMark.findByPk(product.id_marca, {
                attributes: ["nombre", "id"],
            });
            const photography = await Photography.findAll({
                id_producto: req.params.id,
            });

            res.render("seller/edit-product", {
                title: `Editar Producto | Mujeres CTIAM`,
                product,
                user: req.user,
                category,
                mark,
                photography,
                isAuthenticated: true,
            });
        }
    },
};
