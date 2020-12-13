const { LandMark } = require("../repository/database").models;

module.exports = {
    getLandMark: async () => {
        return await LandMark.findAll();
    },
    createLandMark: async (req, res)=>{
        const {nombre} = req.body;
        const landMark = await LandMark.create({
            nombre,
        });
        if(landMark){
            req.flash("success", "se ha creado correctamente la marca");
            return res.redirect("/admin/landMarks");
        }
        req.flash("error", "No se ha podido crear la marca");
        return res.redirect("/admin/landMarks");
    },
    updateALandMark: async (req,res)=>{
        const landMarkDB = await LandMark.findByPk(req.params.id);
        const landMark = req.body;
        for (field in landMark){
            landMarkDB[field] = landMark[field];
        }
        try {
            await landMarkDB.save();
            req.flash("success", "Se ha actualizado la marca correctamente");
            return res.redirect("/admin/landMarks");
        }catch(e){
            req.flash("error", "Ha ocurrido un error inesperado");
            return res.redirect("/admin/landMarks");
        }
    },
    deleteALandMark: async (req, res) => {
        console.log("hola")
        const landMark = await LandMark.findByPk(req.params.id);
        console.log(LandMark)
        if(landMark){
            await landMark.destroy();
            req.flash("success" , "Se ha eleminado correctamente la marca");
            return res.redirect("/admin/landMarks");
        } 
        req.flash(
            "error",
            "La marca que ha intentado eliminar no  existe!"
        );
        return res.redirect("/admin/landMarks");
    },
};
