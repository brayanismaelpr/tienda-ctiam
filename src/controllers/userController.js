const Product = require("../repository/models/Producto");

const {
    Address,
    Cart,
    City,
    Favorite,
    ItemCart,
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
            const value = product.precio;
            const amount = 1;
            const cartCreate = await ItemCart.create({
                id_producto: id_product,
                id_carrito: cart
                    ? cart.id
                    : await Cart.create({
                          id: req.user.id,
                          valor_total: value,
                      }).then((res) => res.id),
                cantidad: amount,
                precio: value,
            });
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
    createDirection: async (req, res) =>{
        const {ciudad, barrio, calle, avenida, numero, descripcion} = req.body;
        const city = await City.findOne({
            where: {
                nombre:ciudad
            }
        });
        if (city) {
            const direction = await Address.create({
               id_usuario: req.user.id,
               id_ciudad: city.id,
               barrio,
               avenida,
               calle,
               numero,
               descripcion
            });
            if (direction) {
                req.flash("success", "Dirección agregada correctamente");
                return res.redirect('/user/home');
            }
        }
        req.flash("error", "Ha ocurrido un error inesperado");
        return res.redirect('/user/home');
    },
};
