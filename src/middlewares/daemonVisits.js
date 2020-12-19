const { Product } = require("../repository/database").models;

async function daemon() {
    const productDemon = await Product.findAll({ limit: 1 });
    if (productDemon.length > 0) {
        let listaDemon = JSON.parse(productDemon[0].visitas);
        if (typeof listaDemon == "string") {
            listaDemon = JSON.parse(listaDemon);
        }
        let f = new Date();
        let day =
            f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
        if (
            listaDemon.visitas.find((find) => find.fecha === day) === undefined
        ) {
            let products = await Product.findAll();
            products.map((product) => {
                let lista = JSON.parse(product.visitas);
                if (typeof lista == "string") {
                    lista = JSON.parse(lista);
                }
                if (
                    lista.visitas.find((find) => find.fecha === day) ===
                    undefined
                ) {
                    lista.visitas.push({
                        fecha: day,
                        contador: 0,
                    });
                }
                product["visitas"] = JSON.stringify(lista);
                product.save();
            });
        }
    }
}

module.exports = daemon;
