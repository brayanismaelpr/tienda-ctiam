module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        const { email } = req.user;
        const admin = require("../repository/database").models.Admin.findOne({
            where: {
                email,
            },
        });
        if (admin) {
            return next();
        }
        return res.redirect("/login/admin");
    }
    res.redirect("/login/admin");
};
