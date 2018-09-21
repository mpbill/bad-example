"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController = require("../controllers/api");
const passportConfig = require("../config/passport");
class Api {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", apiController.getApi);
        this.router.get("/facebook", passportConfig.isAuthenticated, apiController.getFacebook);
    }
}
const apiRoutes = new Api();
exports.default = apiRoutes.router;
//# sourceMappingURL=api.js.map