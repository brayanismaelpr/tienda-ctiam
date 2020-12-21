const { ItemCart, Product, Cart } = require("../repository/database").models;

module.exports = {
    deleteAItem: async (req, res) => {
        const item = await ItemCart.findByPk(req.params.id);
        const cart = await Cart.findByPk(req.user.id);
        if (item) {
            cart.valor_total -= item.precio;
            await cart.save();
            await item.destroy();
            return res.redirect("/user/cart");
        }
        return res.redirect("/user/cart");
    },
    changeAmountProduct: async (req, res) => {
        const { idProduct } = req.body;
        let { amount } = req.body;
        if (idProduct) {
            const itemCart = await ItemCart.findOne({
                where: {
                    id_producto: idProduct,
                    id_carrito: req.user.id,
                },
            });
            if (itemCart) {
                const product = await Product.findByPk(idProduct);
                const cart = await Cart.findByPk(req.user.id);
                if (product) {
                    console.log(product.stock, amount, product.stock <= amount);
                    if (product.stock <= amount) {
                        console.log("cambiando amount");
                        amount = product.stock;
                    }
                    itemCart.precio = Number(amount) * Number(product.precio);
                    itemCart.cantidad = amount;
                    await itemCart.save();
                    const items = await ItemCart.findAll({
                        where: {
                            id_carrito: cart.id,
                        },
                        attributes: ["precio"],
                    });
                    if (items.length === 1) {
                        cart.valor_total = items[0].dataValues.precio;
                        await cart.save();
                        return res.json({
                            precio: itemCart.precio,
                            total: cart.valor_total,
                            amount,
                        });
                    }
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
                        amount,
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
