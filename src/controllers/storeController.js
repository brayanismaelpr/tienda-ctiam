const { Store } = require("../repository/database").models;

module.exports = {
    updateAStore: async (req, res) => {
        const store = req.body;
        let storeDB = await Store.findByPk(req.user.id);
        if (store) {
            for (field in store) {
                storeDB[field] = store[field];
            }
            await storeDB.save();
            return res.redirect("/seller/store");
        }
        return res.redirect("/seller/store");
    },
    getQuestions: async (req, res) => {
        const questions = await Store.getQuestions(req.user.id);
        const store = await Store.findByPk(req.user.id);
        res.render("seller/questions", {
            title: "Mis preguntas | Mujeres CTIAM",
            user: req.user,
            store,
            isAuthenticated: true,
            questions,
        });
    },
};
