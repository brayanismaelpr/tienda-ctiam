require("dotenv").config();
require("../config");
const express = require("express");
const app = express();
const flash = require("connect-flash");
const hbs = require("express-handlebars");
require("./repository/database");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const router = require("./routes");

require("./passport/localAuth");

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(__dirname, "/views", "/layouts"),
        helpers: {
            URL: () => process.env.ORIGIN,
            showModal: (bool) => (bool ? "block" : "none"),
            avatar: (avatar) => {
                if (avatar) return avatar;
                return "../images/perfil/photo.jpg";
            },
            imageStore: (imageStore) => {
                if (imageStore) return imageStore;
                return "../images/photo-store/default-store.jpeg";
            },
            coverStore: (imageStore) => {
                if (imageStore) return imageStore;
                return "../images/photo-store/cover.jpg";
            },
            times: (n, block) => {
                var accum = "";
                for (var i = 0; i < n; ++i) accum += block.fn(i);
                return accum;
            },
        },
    })
);

app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(morgan(process.env.NODE_ENV));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.signingMessage = req.flash("signingMessage");
    res.locals.signupMessage = req.flash("signupMessage");
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use(router);

app.listen(app.get("port"), () => {
    console.log(`listen on port ${app.get("port")}`);
});
