const Product = require("../repository/models/Producto");

const {
    Address,
    Cart,
    City,
    Favorite,
    ItemCart,
    ItemSale,
    Order,
    Sale,
    User,
} = require("../repository/database").models;

module.exports = {
    updateAUser: async (req, res) => {
        const user = req.body;
        let userDB = await User.findByPk(req.user.id);
        for (field in user) {
            userDB[field] = user[field];
        }
        try {
            await userDB.save();
            req.flash("success", "Perfil actualizado correctamente");
            return res.redirect("/user/home");
        } catch (e) {
            req.flash("error", "Ha ocurrido un error inesperado");
            return res.redirect("/user/home");
        }
    },
    getFavorites: async (req, res) => {
        const favourites = await User.findFavorites(req.user.id);
        res.render("user/favourite", {
            title: "Favoritos | Mujeres CTIAM",
            user: req.user,
            isAuthenticated: true,
            favourites,
        });
    },
    setFavorites: async (req, res) => {
        const idProduct = req.params.id;
        const itemFavorite = await Favorite.findOne({
            where: {
                id_producto: idProduct,
                id_usuario: req.user.id,
            },
        });
        if (itemFavorite) {
            return res.redirect("/user/cart");
        }
        const favourites = await Favorite.create({
            id_producto: idProduct,
            id_usuario: req.user.id,
        });
        return res.redirect("/user/favorites");
    },
    deleteFavorites: async (req, res) => {
        const id_favorito = req.params.id;
        const favorite = await Favorite.findByPk(id_favorito);
        if (favorite) {
            await favorite.destroy().then(() => {
                return res.redirect("/user/favorites");
            });
        }
        res.redirect("/user/favorites");
    },
    getCart: async (req, res) => {
        const itemsCart = await User.findCart(req.user.id);
        const cart = await Cart.findByPk(req.user.id);
        res.render("user/cart", {
            title: "Carrito | Mujeres CTIAM",
            user: req.user,
            isAuthenticated: true,
            itemsCart,
            cart,
        });
    },
    getQuestions: async (req, res) => {
        const questions = await User.getQuestions(req.user.id);
        res.render("user/questions", {
            title: "Mis preguntas | Mujeres CTIAM",
            user: req.user,
            isAuthenticated: true,
            questions,
        });
    },
    setCart: async (req, res) => {
        const id_product = req.params.id;
        const id_cart = req.user.id;
        let cart = await Cart.findByPk(id_cart);
        const product = await Product.findByPk(id_product);
        if (product) {
            let itemCart = undefined;
            if (cart) {
                itemCart = await ItemCart.findOne({
                    where: {
                        id_producto: id_product,
                        id_carrito: cart.id,
                    },
                });
            }
            if (!itemCart) {
                const value = product.precio;
                const amount = 1;
                await ItemCart.create({
                    id_producto: id_product,
                    id_carrito: cart
                        ? cart.id
                        : await Cart.create({
                              id: req.user.id,
                              valor_total: value,
                          }).then((res) => res.id),
                    cantidad: amount,
                    precio: value,
                }).then(async () => {
                    await Cart.findByPk(id_cart).then(async (cart) => {
                        cart.valor_total += value;
                        await cart.save();
                    });
                    return res.redirect("/user/cart");
                });
            }
            return res.redirect("/user/cart");
        }
    },
    updatePassword: async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        if (oldPassword !== newPassword) {
            let userDB = await User.findByPk(req.user.id);
            if (userDB.comparePassword(oldPassword)) {
                userDB.password = User.encryptPassword(newPassword);
                await userDB.save();
                req.flash("success", "Contraseña actualizada correctamente");
                return res.redirect("/user/home");
            }
            req.flash("error", "Contraseña actual incorrecta");
            return res.redirect("/user/change-password");
        }
        req.flash(
            "error",
            "La nueva contraseña no puede ser igual a la contraseña anterior"
        );
        return res.redirect("/user/change-password");
    },
    createDirection: async (req, res) => {
        const {
            ciudad,
            barrio,
            calle,
            avenida,
            numero,
            descripcion,
        } = req.body;
        const city = await City.findOne({
            where: {
                nombre: ciudad,
            },
        });
        if (city) {
            const direction = await Address.create({
                id_usuario: req.user.id,
                id_ciudad: city.id,
                barrio,
                avenida,
                calle,
                numero,
                descripcion,
            });
            if (direction) {
                req.flash("success", "Dirección agregada correctamente");
                return res.redirect("/user/home");
            }
        }
        req.flash("error", "Ha ocurrido un error inesperado");
        return res.redirect("/user/home");
    },
    makeOrder: async (req, res) => {
        const id_producto = req.body.id_producto;
        const cantidad = Number(req.body.cantidad);
        let product = await Product.findByPk(id_producto);
        if (product) {
            const addresses = await User.getAddresses(req.user.id);
            const id_tienda = product.dataValues.id_tienda;
            product.dataValues.cantidad = cantidad;
            product.dataValues.precio *= cantidad;
            let pack = { [id_tienda]: [product.dataValues] };
            return res.render("user/preview-order-product", {
                title: "Pedido | Mujeres CTIAM",
                user: req.user,
                isAuthenticated: req.user != undefined,
                pack,
                addresses,
            });
        }
        return res.render("error", {
            title: "Página no encontrada | Mujeres CTIAM",
            user: req.user,
            isAuthenticated: req.user != undefined,
        });
    },
    makeCartOrder: async (req, res) => {
        const cartItems = await User.getCartItems(req.user.id);
        if (cartItems) {
            const addresses = await User.getAddresses(req.user.id);
            let pack = {};
            cartItems.forEach((item) => {
                if (pack[item.id_tienda]) {
                    pack[item.id_tienda].push(item);
                } else {
                    pack[item.id_tienda] = [item];
                }
            });
            return res.render("user/preview-order-cart", {
                title: "Pedido | Mujeres CTIAM",
                user: req.user,
                isAuthenticated: req.user != undefined,
                pack,
                addresses,
            });
        }
        return res.render("error", {
            title: "Página no encontrada | Mujeres CTIAM",
            user: req.user,
            isAuthenticated: req.user != undefined,
        });
    },
    createOrder: async (req, res) => {
        const { id_producto, total, cantidad } = req.body;
        id_usuario = req.user.id;
        const tienda = await Product.findByPk(id_producto, {
            attributes: ["id_tienda"],
        });
        if (tienda) {
            const id_tienda = tienda.dataValues.id_tienda;
            const order = await Order.create({ id_usuario, total });
            if (order) {
                const id_pedido = order.dataValues.id;
                const sale = await Sale.create({ id_tienda, id_pedido, total });
                if (sale) {
                    const id_venta = sale.dataValues.id;
                    await ItemSale.create({
                        id_pedido,
                        id_producto,
                        id_venta,
                        cantidad,
                        precio: total
                    });
                    return res.redirect("/user/shopping");
                }
            }
        }
        return res.redirect(`/product/${id_producto}`);
    },
    createOrderCart: async (req, res) => {
        const cartItems = await User.getCartItems(req.user.id);
        if (cartItems) {
            let pack = {};
            var totalOrderCart = 0;
            const order = await Order.create({
                id_usuario: req.user.id,
                total: 0,
            });
            cartItems.forEach((item) => {
                if (pack[item.id_tienda]) {
                    pack[item.id_tienda].push(item);
                } else {
                    pack[item.id_tienda] = [item];
                }
            });
            var totalSaleCart = 0;
            for (const store in pack) {
                await Sale.create({
                    id_tienda: store,
                    id_pedido: order.id,
                    total: 0,
                }).then(async (sale) => {
                    pack[store].forEach(async (item) => {
                        ItemSale.create({
                            id_pedido: order.id,
                            id_producto: item.id,
                            id_venta: sale.id,
                            cantidad: item.cantidad,
                            precio: item.precio,
                        });
                        totalSaleCart += Number(item.precio);
                    });
                    totalOrderCart += totalSaleCart;
                    sale.total = totalSaleCart;
                    await sale.save();
                    totalSaleCart = 0;
                });
            }
            order.total = totalOrderCart;
            await order.save();
            await ItemCart.destroy({
                where: {
                    id_carrito: req.user.id,
                },
            });
            const cart = await Cart.findByPk(req.user.id);
            if (cart) {
                cart.valor_total = 0;
                await cart.save();
            }
            return res.redirect("/user/cart");
        }
        return res.json({ ok: true });
    },
};
