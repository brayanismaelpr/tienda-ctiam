const { Router } = require("express");
const router = Router();
const { cartController, userController } = require("../controllers");
const { Address, City, User } = require("../repository/database").models;

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
    res.render("user/shopping", {
        title: "Mis compras | Mujeres CTIAM",
        user: req.user,
        isAuthenticated: req.user != undefined,
    });
});

router.get("/getShoppings", async (req, res) => {
    const shoppings = await User.getShoppings(req.user.id);
    if (shoppings) {
        return res.render("user/shopping",{
            title: "Mis compras | Mujeres CTIAM",
            user,
            shoppings,
            isAuthenticated: true,
        });
    }
    return res.render();
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
