const { ItemCart, Product, Cart } = require("../repository/database").models;

module.exports = {
    deleteAItem: async (req, res) => {
        const item = await ItemCart.findByPk(req.params.id);
        if (item) {
            item.destroy();
            return res.redirect("/user/cart");
        }
        return res.redirect("/user/cart");
    },
    changeAmountProduct: async (req, res) => {
        const { amount, idProduct } = req.body;
        if (idProduct) {
            const itemCart = await ItemCart.findOne({
                where: {
                    id_producto: idProduct,
                    id_carrito: req.user.id,
                },
            });
            if (itemCart) {
                const product = await Product.findByPk(idProduct);
                if (product) {
                    itemCart.precio = Number(amount) * Number(product.precio);
                    itemCart.cantidad = amount;
                    await itemCart.save();
                    const cart = await Cart.findByPk(req.user.id);
                    const items = await ItemCart.findAll({
                        where: {
                            id_carrito: cart.id,
                        },
                        attributes: ["precio"],
                    });
                    cart.valor_total = items.reduce((acc, current) => {
                        if (acc.dataValues) {
                            return (
                                Number(acc.dataValues.precio) +
                                Number(current.dataValues.precio)
                            );
                        }
                        return acc + Number(current.dataValues.precio);
                    });
                    await cart.save();
                    return res.json({
                        precio: itemCart.precio,
                        total: cart.valor_total,
                    });
                }
            }
            return res.json({
                error: "Item no encontrado",
            });
        }
        return res.json({});
    },
};
