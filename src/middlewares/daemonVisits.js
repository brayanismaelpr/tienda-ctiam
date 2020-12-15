const { Product } = require("../repository/database").models;

async function daemon() {
    const productDemon = await Product.findAll({ limit: 1 });
    if (productDemon) {
        const listaDemon = JSON.parse(productDemon[0].visitas);
        let f = new Date();
        let day = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
        if (listaDemon.visitas.find(find => find.fecha === day) === undefined) {
            let products = await Product.findAll();
            products.map(product => {
                const lista = JSON.parse(product.visitas);
                if (lista.visitas.find(find => find.fecha === day) === undefined) {
                    lista.visitas.push({
                        "fecha": day,
                        "contador": 0
                    });
                }
                product['visitas'] = lista;
                product.save();
            })
        }
    }
}

module.exports = daemon;