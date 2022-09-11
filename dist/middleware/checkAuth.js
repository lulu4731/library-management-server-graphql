"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const jsonwebtoken_1 = require("jsonwebtoken");
const checkAuth = ({ context }, next) => {
    try {
        const authHeader = context.req.header('Authorization');
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            throw new apollo_server_core_1.AuthenticationError('Not authenticated to perform Graphql operations');
        }
        const decodeUser = (0, jsonwebtoken_1.verify)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        context.librarian = decodeUser;
        return next();
    }
    catch (error) {
        throw new apollo_server_core_1.AuthenticationError(`Error authentication user, ${JSON.stringify(error)}`);
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map