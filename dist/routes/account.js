"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = require("../controllers/user");
const passportConfig = require("../config/passport");
class Account {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", passportConfig.isAuthenticated, userController.getAccount);
        this.router.post("/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
        this.router.post("/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
        this.router.post("/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
        this.router.get("/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);
    }
}
const accountRoutes = new Account();
exports.default = accountRoutes.router;
//# sourceMappingURL=account.js.map