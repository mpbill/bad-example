"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
class Oauth {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
        this.router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
            res.redirect(req.session.returnTo || "/");
        });
    }
}
const oauthRoutes = new Oauth();
exports.default = oauthRoutes.router;
//# sourceMappingURL=oauth.js.map