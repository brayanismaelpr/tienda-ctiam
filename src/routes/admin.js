const { Router } = require("express");
const router = Router();
const isAdmin = require("../middlewares/isAdmin");
const { Op } = require("sequelize");
const {
    adminController,
    frequentQuestionController,
    categoryController,
    landMarkController,
} = require("../controllers");
const {
    Category,
    FrequentQuestions,
    Photography,
    State,
    Store,
    Product,
    LandMark,
} = require("../repository/database").models;

router.use(isAdmin);

router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/user-list", adminController.findNoSellers);

router.get("/make-seller/:id", adminController.makeSeller);

router.get("/frecuent-questions", async (req, res) => {
    const frequentQuestions = await frequentQuestionController.getFrequentQuestions();
    res.render("admin/questions", {
        frequentQuestions,
    });
});

router.get("/categorys", async (req, res) => {
    const categorys = await categoryController.getCategorys();
    res.render("admin/categorys", {
        categorys,
    });
});

router.get("/landMarks", async (req, res) => {
    const landMarks = await landMarkController.getLandMark();
    res.render("admin/landMark", {
        landMarks,
    });
});

router.post("/frecuent-questions", frequentQuestionController.createAQuestion);

router.post("/categorys", categoryController.createACategory);

router.post("/landMarks", landMarkController.createLandMark);

router.get("/frecuent-questions/:id", async (req, res) => {
    const frequentQuestion = await FrequentQuestions.findByPk(req.params.id);
    res.json({
        status: true,
        frequentQuestion: frequentQuestion.dataValues,
    });
});

router.get("/categorys/:id", async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    res.json({
        status: true,
        category: category.dataValues,
    });
});
router.get("/landMarks/:id", async (req, res) => {
    const landMark = await LandMark.findByPk(req.params.id);
    console.log(req.params.id);
    res.json({
        status: true,
        landMark: landMark.dataValues,
    });
});
router.post(
    "/frecuent-questions/:id",
    frequentQuestionController.updateAQuestion
);

router.post("/categorys/:id", categoryController.updateACategory);

router.post("/landMarks/:id", landMarkController.updateALandMark);

router.post(
    "/delete-frecuent-questions/:id",
    frequentQuestionController.deleteAQuestion
);

router.post("/delete-categorys/:id", categoryController.deleteACategory);

router.get("/delete-landMarks/:id", landMarkController.deleteALandMark);

router.get("/revision-products", async (req, res) => {
    const products = await Product.findAll({
        where: {
            id_estado: 1,
        },
    });
    products.forEach(async (product) => {
        const nameStore = await Store.findByPk(product.id_tienda).then(
            (res) => res.nombre
        );
        product.nombreTienda = nameStore;
    });
    res.render("admin/revision-products", {
        products,
    });
});

router.post("/change-state-product", adminController.changeProductState);

router.get("/revision-products/:id", async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    const pictures = await Photography.findAll({
        where: {
            id_producto: product.dataValues.id,
        },
    });
    const states = await State.findAll({
        where: {
            [Op.not]: [{ id: [1, 4] }],
        },
    });
    res.render("admin/manage-product", {
        states,
        pictures,
        product,
    });
});

router.get("/statistics", (req, res) => {
    res.render("admin/statistics");
});

router.get("/getStatistics", async (req, res) => {
    const products = await Product.findAll();
    const root = ["tiendas", "total"];
    let pie = [];
    products.map((item) => {
        let data = JSON.parse(item.visitas);
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        const tienda = item.dataValues.id_tienda;
        const total = data.visitas
            .map((item) => item.contador)
            .reduce((acc, valor) => acc + valor);
        if (pie.find((find) => find[0] == tienda) !== undefined) {
            pie.find((find) => find[0] == tienda)[1] += total;
        } else {
            pie.push([tienda + "", total]);
        }
    });
    for (let i = 0; i < pie.length; i++) {
        tienda = await Store.findByPk(Number(pie[i][0]));
        pie[i][0] = tienda.dataValues.nombre;
    }
    pie.sort((a, b) => b[1] - a[1]);
    if (pie.length > 5) {
        for (let i = 0; i < pie.length - 5; i++) {
            pie.pop();
        }
    }
    pie.splice(0, 0, root);
    return res.json({
        pie,
    });
});

module.exports = router;
