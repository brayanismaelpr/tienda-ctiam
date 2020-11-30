const { Router } = require("express");
const passport = require("passport");
const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Iniciar sesión | Mujeres CTIAM",
        modal: true,
    });
});

router.post(
    "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/login",
        passReqToCallback: true,
    })
);

router.post(
    "/signin",
    passport.authenticate("local-signin", {
        successRedirect: "/",
        failureRedirect: "/login",
        passReqToCallback: true,
    })
);

router.get(
    "/signin/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login",
        passReqToCallback: true,
    })
);

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.redirect("/");
});

router.get("/admin", (req, res) => {
    res.render("admin/login");
});

router.post(
    "/signin-admin",
    passport.authenticate("local-signin-admin", {
        successRedirect: "/admin",
        failureRedirect: "/login/admin",
        passReqToCallback: true,
    })
);

router.post(
    "/signup-admin",
    passport.authenticate("local-signup-admin", {
        successRedirect: "/login/admin",
        failureRedirect: "/login/admin",
        passReqToCallback: true,
    })
);

module.exports = router;
