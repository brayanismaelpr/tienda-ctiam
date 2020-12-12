const { Router } = require("express");
const router = Router();
const { cartController, userController } = require("../controllers");
const { Address, City, ItemSale, Order, Sale, Store, User } = require("../repository/database").models;

router.get("/home", async (req, res) => {
    const user = req.user;
    const directionsDB = await Address.findAll({
        where: {
            id_usuario: user.id,
        },
    }).then((data) => {
        data.forEach(async (item) => {
            cityDB = await City.findOne({
                where: {
                    id: item.id_ciudad,
                },
            });
            item.city = cityDB.nombre;
        });
        res.render("user/perfil", {
            title: "Perfil | Mujeres CTIAM",
            user,
            directions: data,
            isAuthenticated: true,
        });
    });
});
router.get("/change-password", (req, res) => {
    res.render("user/password", {
        title: "Cambiar contraseña | Mujeres CTIAM",
        user: req.user,
        isAuthenticated: req.user != undefined,
    });
});

router.post("/change-password", userController.updatePassword);

router.get("/questions", userController.getQuestions);

router.get("/shopping", async (req, res) => {
    const shoppings = await User.getShoppings(req.user.id);
    if (shoppings) {
        shoppings.forEach(shopping => {
            let fecha = new Date(shopping.fecha_pedido);
            shopping.fecha_pedido = `${fecha.getDate()}/${(fecha.getMonth()+1)}/${fecha.getFullYear()}`
        });
        return res.render("user/shopping",{
            title: "Mis compras | Mujeres CTIAM",
            user: req.user,
            shoppings,
            isAuthenticated: true,
        });
    }
    return res.render("user/shopping",{
        title: "Mis compras | Mujeres CTIAM",
        user: req.user,
        shoppings,
        isAuthenticated: true,
    });
});

router.get("/details-shopping/:id", async (req, res) => {
    const id_order = req.params.id;
    if (id_order) {
        const order = await Order.findByPk(id_order, {
            attributes: ["id", "total", "createdAt"],
        });
        let date = new Date(order.dataValues.createdAt);
        order.fecha = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
        const sales = await Sale.findAll({
            where: {
                id_pedido: id_order,
            }
        });
        if (sales) {
            sales.forEach(async sale => {
                sale.tienda = await Store.findByPk(sale.id_tienda, {
                    attributes: ["nombre", "telefono", "email"],
                });
                sale.items = await ItemSale.getBySale(sale.id);
            });
        }
        return res.render("user/details-shopping", {
            title: "Detalles compra | Mujeres CTIAM",
            user: req.user,
            sales,
            order,
            isAuthenticated: true,
        });
    }
});

router.post("/update", userController.updateAUser);

router.post("/create-direction", userController.createDirection);

router.get("/favorites", userController.getFavorites);

router.get("/favorites/:id", userController.setFavorites);

router.get("/deleteFavorites/:id", userController.deleteFavorites);

router.get("/cart", userController.getCart);

router.get("/cart/:id", userController.setCart);

router.post("/cart/setAmount", cartController.changeAmountProduct);

router.get("/cart/delete/:id", cartController.deleteAItem);

router.post("/checkout", userController.makeOrder);

router.post("/checkout/cart", userController.makeCartOrder);

router.post("/order", userController.createOrder);

router.post("/order/cart", userController.createOrderCart);

module.exports = router;
