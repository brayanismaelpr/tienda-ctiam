const { Router } = require("express");
const router = Router();
const routerStore = require("./store");
const { ItemSale, Product, Sale, Store, User } = require("../repository/database").models;
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

router.get("/my-products", sellerController.getProducts);

router.post("/my-products", sellerController.updateProducts);


router.post("/sales", async (req, res) => {
    const sales = await Store.getSaleslimit(req.user.id);
    if (sales) {
        sales.forEach(sale => {
            let fecha = new Date(sale.fecha);
            sale.fecha = `${fecha.getDate()}/${
                fecha.getMonth() + 1
            }/${fecha.getFullYear()}`;
        });
        // sales.forEach(async(sale)=>{
        //     const find = await Sale.findByPk(sale.id_venta);
        //     const itemsSales = await ItemSale.getBySale(find.id);
        //     sale.url = itemsSales[0].imagen;
        // });
        return res.json({
            sales,
        });
    }
    return res.json({
        sales,
    });
});

router.get("/sales", async (req, res) => {
    const sales = await Store.getSales(req.user.id);
    if (sales) {
        sales.forEach((sale) => {
            let fecha = new Date(sale.fecha);
            sale.fecha = `${fecha.getDate()}/${
                fecha.getMonth() + 1
            }/${fecha.getFullYear()}`;
        });
        return res.render("seller/sales", {
            title: "Mis compras | Mujeres CTIAM",
            user: req.user,
            sales,
            isAuthenticated: true,
        });
    }
    return res.render("user/shopping", {
        title: "Mis compras | Mujeres CTIAM",
        user: req.user,
        sales,
        isAuthenticated: true,
    });
});

router.get("/details-sale/:id", async (req, res) => {
    const id_sale = req.params.id;
    if (id_sale) {
        const sale = await Sale.findByPk(id_sale);
        const user = await User.getBySale(id_sale);
        if (sale) {
            const itemsSales = await ItemSale.getBySale(sale.id);
            return res.render("seller/details-sale", {
                title: "Detalles compra | Mujeres CTIAM",
                user: req.user,
                itemsSales,
                sale,
                user: req.user,
                userBuyer: user[0],
                isAuthenticated: true,
            });
        }
    }
}),

router.post("/products", sellerController.createProduct);

router.post("/products/delete", sellerController.deleteProduct);

router.use("/store", routerStore);

module.exports = router;
