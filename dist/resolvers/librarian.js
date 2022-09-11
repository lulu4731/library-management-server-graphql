"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrarianResolver = void 0;
const LibrarianMutationResponse_1 = require("../types/LibrarianMutationResponse");
const LoginInput_1 = require("../types/LoginInput");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const auth_1 = require("../utils/auth");
const Librarian_1 = require("../entities/Librarian");
let LibrarianResolver = class LibrarianResolver {
    async librarian() {
        return await Librarian_1.Librarian.find();
    }
    async login({ email, password }, {}) {
        const existingLibrarian = await Librarian_1.Librarian.findOne({
            where: {
                email
            }
        });
        if (!existingLibrarian) {
            return {
                code: 400,
                success: false,
                message: 'Email not found'
            };
        }
        const isPasswordValid = await argon2_1.default.verify(existingLibrarian.password, password);
        if (!isPasswordValid) {
            return {
                code: 400,
                success: false,
                message: 'Incorrect Password'
            };
        }
        return {
            code: 200,
            success: true,
            message: 'Login Successfully',
            librarian: existingLibrarian,
            accessToken: (0, auth_1.createToken)(existingLibrarian)
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Librarian_1.Librarian]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LibrarianResolver.prototype, "librarian", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => LibrarianMutationResponse_1.LibrarianMutationResponse),
    __param(0, (0, type_graphql_1.Arg)('loginInput')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], LibrarianResolver.prototype, "login", null);
LibrarianResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LibrarianResolver);
exports.LibrarianResolver = LibrarianResolver;
//# sourceMappingURL=librarian.js.map