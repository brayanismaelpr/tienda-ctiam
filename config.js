process.env.PORT = process.env.PORT || 4000;

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

process.env.SECRET_SESSION = process.env.SECRET_SESSION || "secretsessiondev";

process.env.KEY_ADMIN = process.env.KEY_ADMIN || "llavesita";

process.env.REDIRECT_GOOGLE =
    process.env.REDIRECT_GOOGLE ||
    "http://localhost:4000/login/google/callback";
