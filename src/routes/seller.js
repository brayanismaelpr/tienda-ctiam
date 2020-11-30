const { Router } = require("express");
const router = Router();
const routerStore = require("./store");
const { Product, Store } = require("../repository/database").models;
const isSeller = require("../middlewares/isSeller");
const { sellerController } = require("../controllers/index");

router.use(isSeller);

router.get("/", (req, res) => res.redirect("/seller/store"));

router.get("/products", async (req, res) => {
    const user = req.user;
    const store = await Store.findByPk(user.id);
    const products = await Product.findAll({
        where: {
            id_tienda: store.id,
        },
    });
    return res.render("seller/register-pruduct", {
        title: "Mis publicaciones | Mujeres CTIAM",
        user,
        store: store.dataValues,
        isAuthenticated: true,
        products,
    });
});

router.get("/my-products", async (req, res) => {
    const user = req.user;
    const store = await Store.findByPk(user.id);
    const products = await Product.findAll({
        where: {
            id_tienda: store.id,
        },
    });
    res.render("seller/manageProduct", {
        title: `Mis productos | Mujeres CTIAM`,
        user,
        products,
        store: store.dataValues,
        isAuthenticated: true,
    });
});

router.post("/products", sellerController.createProduct);

router.post("/products/delete", sellerController.deleteProduct);

router.use("/store", routerStore);

module.exports = router;
