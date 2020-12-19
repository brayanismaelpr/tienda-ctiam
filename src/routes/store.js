const { Router } = require("express");
const { Store, Product } = require("../repository/database").models;
const { storeController } = require("../controllers");
const router = Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const isSeller = require("../middlewares/isSeller");
const { Op } = require("sequelize");

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
    const stores = await Store.findAll({
        where: {
            nombre: {
                [Op.not]: ["Nombre de la tienda"],
            },
        },
    });
    if (stores) {
        const promise = new Promise((resolve, reject) => {
            let contador = 0;
            stores.forEach(async (store, index) => {
                await Product.findAndCountAll({
                    where: {
                        id_tienda: store.id,
                    },
                    limit: 3,
                }).then((res) => {
                    store.products = res.rows;
                    contador++;
                    if (contador == stores.length - 1) {
                        resolve();
                    }
                });
            });
        });
        promise.then(() => {
            return res.render("allStores", {
                title: "Tiendas | Mujeres CTIAM",
                user,
                stores,
                isAuthenticated: user !== undefined,
            });
        });
    }
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

router.get("/change", storeController.getChangeProduct);

router.get("/return", storeController.getReturnProduct);


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
