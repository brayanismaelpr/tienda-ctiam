const { FrequentQuestions } = require("../repository/database").models;

module.exports = {
    getFrequentQuestions: async () => {
        return await FrequentQuestions.findAll();
    },
    createAQuestion: async (req, res) => {
        const { pregunta, respuesta } = req.body;
        const frequentQuestions = await FrequentQuestions.create({
            pregunta,
            respuesta,
        });
        if (frequentQuestions) {
            req.flash("success", "Pregunta creada correctamente");
            return res.redirect("/admin/frecuent-questions");
        }
        req.flash("error", "Ha ocurrido error inesperado");
        return res.redirect("/admin/frecuent-questions");
    },
    updateAQuestion: async (req, res) => {
        const questionDB = await FrequentQuestions.findByPk(req.params.id);
        const question = req.body;
        for (field in question) {
            questionDB[field] = question[field];
        }
        try{
            await questionDB.save();
            req.flash("success", "Pregunta editada correctamente");
            return res.redirect("/admin/frecuent-questions");
        }catch (e){
            req.flash("error", "Ha ocurrido un error inesperado");
            return res.redirect("/admin/frecuent-questions");
        }
    },
    deleteAQuestion: async (req, res) => {
        const question = await FrequentQuestions.findByPk(req.params.id);
        if (question) {
            question.destroy();
            req.flash("success", "Pregunta eliminada correctamente");
            return res.redirect("/admin/frecuent-questions");
        }
        req.flash("error", "Ha ocurrido un error inesperado");
        return res.redirect("/admin/frecuent-questions");
    },
};
