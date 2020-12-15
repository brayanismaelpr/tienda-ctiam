const {
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
                await Photography.create({ id_producto: product.id, url: element });
            });
            return res.json({ok:true});
        }
        return res.json({ok:false});
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
                [Op.not]: [{ id: [2, 3] }],
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
    updateProducts: async (req, res)=>{
        const data = req.body;
        data.idProduct.map( async item=>{
            let product  = await  Product.findByPk(item)
            product.id_estado=Number(data.id_estado)
            await product.save();
        })
        return  res.redirect("/seller/my-products");
    }
};
