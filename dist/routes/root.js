"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController = require("../controllers/home");
const userController = require("../controllers/user");
class Root {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", homeController.index);
        this.router.get("/login", userController.getLogin);
        this.router.post("/login", userController.postLogin);
        this.router.get("/logout", userController.logout);
        this.router.get("/forgot", userController.getForgot);
        this.router.post("/forgot", userController.postForgot);
        this.router.get("/reset/:token", userController.getReset);
        this.router.post("/reset/:token", userController.postReset);
        this.router.get("/signup", userController.getSignup);
        this.router.post("/signup", userController.postSignup);
    }
}
const rootRoutes = new Root();
exports.default = rootRoutes.router;
//# sourceMappingURL=root.js.map