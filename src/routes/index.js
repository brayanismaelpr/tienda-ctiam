const { Router } = require("express");
const router = Router();
const login = require("./login");
const isAuthenticated = require("../middlewares/isAuthenticated");
const nodeMailer = require("../services/nodemailer");
const admin = require("./admin");
const product = require("./product");
const seller = require("./seller");
const store = require("./store");
const user = require("./user");

const {
    City,
    Product,
} = require("../repository/database").models;

const {
    categoryController,
    landMarkController,
    frequentQuestionController,
} = require("../controllers");

router.get("/", (req, res) => {
    res.render("index", {
        title: "Tienda CTIAM",
        user: req.user,
        isAuthenticated: req.user != undefined,
    });
});

router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contacto | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.post("/contact", (req, res) => {
    const { name, numberPhone, email, message } = req.body;
    nodeMailer(name, email, (err) => {
        if (err) console.log(err);
        res.render("contact", {
            status: err ? false : true,
        });
    });
});

router.get("/list", (req, res) => {
    res.render("list", {
        title: "Lista | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/eliminar-producto", (req, res) => {
    res.render("eliminar-producto", {
        title: "Eliminar producto | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/reportes", (req, res) => {
    res.render("reportes", {
        title: "Reportes | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/preguntas-vendedor", (req, res) => {
    res.render("preguntas-vendedor", {
        title: "Preguntas vendedor | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/profile-store", (req, res) => {
    res.render("profile-store", {
        title: "Perfil tienda | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/questions", async (req, res) => {
    const frequentQuestions = await frequentQuestionController.getFrequentQuestions();
    console.log(frequentQuestions);
    res.render("questions", {
        title: "Preguntas frecuentes | Mujeres CTIAM",
        isAuthenticated: true,
        frequentQuestions,
    });
});

router.get("/list-product", (req, res) => {
    res.render("list-product", {
        title: "Lista productos | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/categories", async (req, res) => {
    const categories = await categoryController.getCategorys();
    return res.json({
        categorias: categories,
    });
});

router.get("/marks", async (req, res) => {
    const marks = await landMarkController.getCategorys();
    return res.json({
        marcas: marks,
    });
});

router.get("/cities" , async (req, res) =>{
    const cities = await City.findAll();
    return res.json({
        cities
    })
});

router.post("/getProductoByLastVisit", async (req, res)=>{
    const {idCategory} = req.body;
    const products = await Product.findAll({
        where:{
            id_categoria:idCategory,
        },
        limit: 4
    });
    if (products) {
        return res.json({
            products
        });
    }
});

router.use("/store", store);

router.use("/login", login);

router.use("/admin", admin);

router.use("/product", product);

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
});

router.use("/user", user);

router.use("/seller", seller);

module.exports = router;
