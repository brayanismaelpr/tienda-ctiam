module.exports = (req, res, next) => {
    if (req.user.is_seller) {
        return next();
    }
    return res.redirect("/");
};
