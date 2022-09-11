"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (user) => (0, jsonwebtoken_1.sign)({
    userId: user.id_librarian
}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15d'
});
exports.createToken = createToken;
//# sourceMappingURL=auth.js.map