"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const bodyParser = require("body-parser");
const compression = require("compression"); // compresses requests
const mongo = require("connect-mongo"); // (session)
const dotenv = require("dotenv");
const errorHandler = require("errorhandler");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const lusca = require("lusca");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const path = require("path");
const expressValidator = require("express-validator");
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });
/**
 * Routes
 */
const account_1 = require("./routes/account");
const api_1 = require("./routes/api");
const contact_1 = require("./routes/contact");
const oauth_1 = require("./routes/oauth");
const root_1 = require("./routes/root");
class App {
    constructor() {
        this.MongoStore = mongo(session);
        this.express = express();
        this.middleware();
        this.routes();
        this.launchConf();
    }
    middleware() {
        this.express.set("port", process.env.PORT || 3000);
        this.express.set("views", path.join(__dirname, "../views"));
        this.express.set("view engine", "pug");
        this.express.use(compression());
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(expressValidator());
        this.express.use(session({
            resave: true,
            saveUninitialized: true,
            secret: process.env.SESSION_SECRET,
            store: new this.MongoStore({
                autoReconnect: true,
                url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
            }),
        }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        this.express.use(flash());
        this.express.use(lusca.xframe("SAMEORIGIN"));
        this.express.use(lusca.xssProtection(true));
        this.express.use((req, res, next) => {
            res.locals.user = req.user;
            next();
        });
        this.express.use((req, res, next) => {
            // After successful login, redirect back to the intended page
            if (!req.user &&
                req.path !== "/login" &&
                req.path !== "/signup" &&
                !req.path.match(/^\/auth/) &&
                !req.path.match(/\./)) {
                req.session.returnTo = req.path;
            }
            else if (req.user &&
                req.path === "/account") {
                req.session.returnTo = req.path;
            }
            next();
        });
        this.express.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
    }
    /**
     * Primary app routes.
     */
    routes() {
        this.express.use("/", root_1.default);
        this.express.use("/api", api_1.default);
        this.express.use("/auth", oauth_1.default);
        this.express.use("/account", account_1.default);
        this.express.use("/contact", contact_1.default);
    }
    launchConf() {
        // mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        mongoose.connection.on("error", () => {
            // tslint:disable-next-line:no-console
            console.log("MongoDB connection error. Please make sure MongoDB is running.");
            process.exit();
        });
        this.express.use(errorHandler());
        /**
         * Start Express server.
         */
        this.express.listen(this.express.get("port"), () => {
            // tslint:disable-next-line:no-console
            console.log(("  App is running at http://localhost:%d \
      in %s mode"), this.express.get("port"), this.express.get("env"));
            // tslint:disable-next-line:no-console
            console.log("  Press CTRL-C to stop\n");
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=server.js.map