const { Router } = require("express");
const { Store, Product } = require("../repository/database").models;
const { storeController } = require("../controllers");
const router = Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const isSeller = require("../middlewares/isSeller");

router.get("/", isAuthenticated, isSeller, async (req, res) => {
    const user = req.user;
    const store = await Store.findByPk(user.id);
    if (store) {
        return res.render("seller/index", {
            title: "Store | Mujeres CTIAM",
            user,
            store: store.dataValues,
            isAuthenticated: true,
        });
    }
    return res.redirect("/");
});

router.get("/all", async (req, res) => {
    const user = req.user;
    const stores = await Store.findAll();
    if (stores) {
        stores.forEach(async (store) => {
            await Product.findAndCountAll({
                where: {
                    id_tienda: store.id,
                },
                limit: 3,
            }).then((res) => {
                store.products = res.rows;
            });
        });
        return res.render("allStores", {
            title: "Tiendas | Mujeres CTIAM",
            user,
            stores,
            isAuthenticated: user !== undefined,
        });
    }
    req.flash("error", "No hay tiendas para mostrar");
    return res.render("allStores", {
        title: "Tiendas | Mujeres CTIAM",
        user,
        stores,
        isAuthenticated: user !== undefined,
    });
});

router.get(
    "/questions",
    isAuthenticated,
    isSeller,
    storeController.getQuestions
);

router.get(
    "/statistics",
    isAuthenticated,
    isSeller,
    storeController.getStatistics
);

router.get("/:id", async (req, res) => {
    const user = req.user;
    const store = await Store.findByPk(req.params.id);
    const products = await Product.findAll({
        where: {
            id_tienda: req.params.id,
        },
    });
    if (store) {
        return res.render("store-index", {
            title: `${store.nombre} | Mujeres CTIAM`,
            user,
            store: store.dataValues,
            isAuthenticated: user != undefined,
            products,
        });
    }
    return res.redirect("/");
});

router.post("/update", isAuthenticated, isSeller, storeController.updateAStore);

module.exports = router;
