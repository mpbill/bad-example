"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController = require("../controllers/contact");
class Contact {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", contactController.getContact);
        this.router.post("/", contactController.postContact);
    }
}
const contactRoutes = new Contact();
exports.default = contactRoutes.router;
//# sourceMappingURL=contact.js.map