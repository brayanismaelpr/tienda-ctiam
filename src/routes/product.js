const { Router } = require("express");
const router = Router();
const { producController } = require("../controllers");

const {
    Product,
    LandMark
} = require("../repository/database").models;

router.get("/:id", producController.getProduct);

router.post("/make-question", producController.makeQuestion);

router.post("/response-question", producController.responseQuestion);

router.post("/search", producController.GetSearch);

router.post("/searchs/:data", async (req, res) => {
    const { Op } = require("sequelize");
    const data = req.params.data;
    const { body } = req.body;
    const id_marca = body.id_marca;
    let products;
    const marksDB = await LandMark.findAll();
    let marks = [];
    marksDB.map(mark => {
        marks.push([mark.dataValues.id,mark.dataValues.nombre]);
    })
    if (id_marca.length) {
        products = await Product.findAll({
            where: {
                id_marca,
                id_estado:{
                    [Op.not]: [1,5]
                },
                precio: {
                    [Op.gte]: body.precio,
                },
                [Op.or]: [
                    {
                        titulo: {
                            [Op.like]: `%${data}%`
                        }
                    },
                    {
                        descripcion: {
                            [Op.like]: `%${data}%`
                        }
                    }
                ]
            }
        });
    } else {
        products = await Product.findAll({
            where: {
                id_estado:{
                    [Op.not]: [1,5]
                },
                precio: {
                    [Op.gte]: body.precio,
                },
                [Op.or]: [
                    {
                        titulo: {
                            [Op.like]: `%${data}%`
                        }
                    },
                    {
                        descripcion: {
                            [Op.like]: `%${data}%`
                        }
                    }
                ]
            }
        });
    }
    products.map(async item => {
        const marcaDB = await LandMark.findByPk(item.id_marca);
        item.dataValues.marca = marcaDB.dataValues.nombre;
    })
    res.json({
        products,
        marks
    });
});

module.exports = router;
