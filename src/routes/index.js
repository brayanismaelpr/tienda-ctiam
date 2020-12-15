const { Router } = require("express");
const router = Router();
const login = require("./login");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isNotAdmin = require("../middlewares/isNotAdmin");
const nodeMailer = require("../services/nodemailer");
const nodeMailer_sub = require("../services/nodemailer-unete");
const nodeMailer_pass = require("../services/nodemailer-pass");
const daemon = require("../middlewares/daemonVisits");
const admin = require("./admin");
const product = require("./product");
const seller = require("./seller");
const store = require("./store");
const user = require("./user");

const { City, Product } = require("../repository/database").models;

const {
    categoryController,
    landMarkController,
    frequentQuestionController,
} = require("../controllers");

const LandMark = require("../repository/models/Marca");
const Subscription = require("../repository/models/Subscripcion");
const User = require("../repository/models/Usuario");

daemon();

router.get("/", (req, res) => {
    if (req.user) {
        const { nombre_usuario } = req.user;
        if (nombre_usuario) {
            res.redirect("/admin");
        }
    }
    res.render("index", {
        title: "Tienda CTIAM",
        user: req.user,
        isAuthenticated: req.user != undefined,
    });
});

router.use("/login", login);

router.use("/admin", admin);

router.use(isNotAdmin);

router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contacto | Mujeres CTIAM",
        user: req.user,
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

router.get("/return", (req, res) => {
    res.render("return", {
        title: "Devoluciones | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/notifications", (req, res) => {
    res.render("notifications", {
        title: "Notificaciones | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/change", (req, res) => {
    res.render("change", {
        title: "Cambiar | Mujeres CTIAM",
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

router.get("/profile-store", (req, res) => {
    res.render("profile-store", {
        title: "Perfil tienda | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
    });
});

router.get("/questions", async (req, res) => {
    const frequentQuestions = await frequentQuestionController.getFrequentQuestions();
    res.render("questions", {
        user: req.user,
        title: "Preguntas frecuentes | Mujeres CTIAM",
        isAuthenticated: req.user != undefined,
        frequentQuestions,
    });
});

router.post("/list-product-c/:id", async (req, res) => {
    function limitDesc(desc) {
        list = desc.split(' ');
        str = "";
        for (let i = 0; i < 4; i++) {
            if (list[i] !== undefined) {
                str += list[i] + " ";
            }
        }
        return str
    }

    const { Op, where } = require("sequelize");
    const id_categoria = req.params.id;
    const { body } = req.body;
    const id_marca = body.id_marca;
    if (id_marca.length) {
        await Product.findAll({
            where: {
                id_categoria,
                id_marca,
                precio: {
                    [Op.gte]: body.precio
                }
            }
        }).then(sendResponse);
    } else {
        await Product.findAll({
            where: {
                id_categoria,
                precio: {
                    [Op.gte]: body.precio
                }
            }
        }).then(sendResponse);
    }
    function sendResponse(products) {
        products.map(async item => {
            item.dataValues.descripcion = limitDesc(item.dataValues.descripcion);
            await LandMark.findByPk(item.id_marca)
                .then(mark => {
                    item.marca = mark.dataValues.nombre
                })
        });
        res.json({
            products,
        });
    }
});

router.get("/list-product-c/:id", async (req, res) => {
    function limitDesc(desc) {
        list = desc.split(' ');
        str = "";
        for (let i = 0; i < 4; i++) {
            if (list[i] !== undefined) {
                str += list[i] + " ";
            }
        }
        return str
    }

    const id_categoria = req.params.id;
    const Marks = await LandMark.findAll();
    const products = await Product.findAll({
        where: {
            id_categoria
        }
    });
    products.map(async item => {
        item.dataValues.descripcion = limitDesc(item.dataValues.descripcion);
        const marcaDB = await LandMark.findByPk(item.id_marca);
        item.marca = marcaDB.dataValues.nombre;
    });
    res.render("list-product", {
        title: "Lista productos | Mujeres CTIAM",
        user: req.user,
        isAuthenticated: req.user != undefined,
        Marks,
        products,
        id_categoria
    });
});

router.get("/categories", async (req, res) => {
    const categories = await categoryController.getCategorys();
    return res.json({
        categorias: categories,
    });
});

router.get("/marks", async (req, res) => {
    const marks = await landMarkController.getLandMark();
    return res.json({
        marcas: marks,
    });
});

router.get("/cities", async (req, res) => {
    const cities = await City.findAll();
    return res.json({
        cities,
    });
});

router.post("/getProductoByLastVisit", async (req, res) => {
    const { idCategory } = req.body;
    const products = await Product.findAll({
        where: {
            id_categoria: idCategory,
        },
        limit: 4,
    });
    if (products) {
        return res.json({
            products,
        });
    }
});

router.get("/getVisita/:id", async (req, res) => {
    const id_producto = req.params.id;
    const product = await Product.findByPk(id_producto);
    if (req.user) {
        if (req.user.id !== product.id_tienda) {
            const lista = JSON.parse(product.visitas);
            let f = new Date();
            let day = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
            if (lista.visitas.find(find => find.fecha === day) !== undefined) {
                lista.visitas.find(find => find.fecha === day).contador++;
            } else {
                lista.visitas.push({
                    "fecha": day,
                    "contador": 1
                });
            }
            product['visitas'] = lista;
            await product.save();
        }
    }
});

router.get("/getVisitas/:id", async (req, res) => {
    const id_producto = req.params.id;
    const product = await Product.findByPk(id_producto);
    const visitas = JSON.parse(product.visitas);
    return res.json({
        visitas,
    });
});

router.get("/getAllVisitas", async (req, res) => {
    const id_tienda = req.user.id;
    const products = await Product.findAll({
        where: {
            id_tienda
        }
    });

    let todos = [['productos', 'total']];
    let i = 0;
    products.map(item => {
        const data = JSON.parse(item.visitas);
        const titulo = item.dataValues.titulo;
        const total = data.visitas.map(item => item.contador).reduce((acc, valor) => acc + valor)
        todos.push([titulo, total])
        i++;
    });
    return res.json({
        todos,
    });
});

router.get("/getDestacados", async (req, res) => {
    const products = await Product.findAll();
    products.map(item => {
        const data = JSON.parse(item.visitas);
        if (data) {
            const visitas = data.visitas.map(item => item.contador);
            if (visitas.length > 0) {
                item.dataValues.total = visitas.reduce((acc, valor) => acc + valor)
            }
        }
    });
    products.sort((a, b) => b.dataValues.total - a.dataValues.total);
    return res.json({
        products,
    });
});

router.post("/recover-pass", async (req, res) => {
    function newPass() {
        let pass = "";
        const charts = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H',
            'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q',
            'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z',
            'Z', '-', '.', '*'
        ];
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (let i = 0; i < 5; i++) {
            const n = Math.round(Math.random() * (charts.length - 0) + 0);
            const m = Math.round(Math.random() * (numbers.length - 0) + 0);
            if (charts[n]) pass += charts[n];
            if (numbers[m]) pass += numbers[m];
        }
        return pass;
    }

    const { email } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (user) {
        const password = newPass();
        user.password = User.encryptPassword(password);
        await user.save();
        nodeMailer_pass(password,email,(err) => {
            if (err) console.log(err);
        });
    } else {
        console.log('no existe')
    }
    res.redirect("/")
});

router.post("/subscription", async (req, res) => {
    try {
        const { correo } = req.body;
        if (!await Subscription.findByPk(correo)) {
            Subscription.create({ correo });
            nodeMailer_sub(correo, (err) => {
                if (err) console.log(err);
                res.redirect("/");
            });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error)
    }
});

router.use("/store", store);

router.use("/product", product);

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
});

router.use("/user", user);

router.use("/seller", seller);

module.exports = router;
