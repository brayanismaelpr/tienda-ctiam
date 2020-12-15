module.exports = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const { email, nombre_usuario } = req.user;
        if (nombre_usuario) {
            const admin = await require("../repository/database").models.Admin.findOne(
                {
                    where: {
                        email,
                    },
                }
            );
            if (admin) {
                return res.redirect("/admin");
            }
            return next();
        }
    }
    return next();
};
