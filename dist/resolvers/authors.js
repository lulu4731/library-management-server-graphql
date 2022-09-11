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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const Authors_1 = require("../entities/Authors");
const interface_1 = require("../types/interface");
let AuthorsResolver = class AuthorsResolver {
    async authors() {
        return await Authors_1.Authors.find();
    }
    async addAuthors(author) {
        const newAuthor = Authors_1.Authors.create(author);
        await newAuthor.save();
        return {
            code: 200,
            success: true,
            message: 'Add author success',
            data: newAuthor
        };
    }
    async deleteAuthors(id_authors) {
        const authorExist = await Authors_1.Authors.findOne({
            where: {
                id_authors
            }
        });
        if (!authorExist) {
            return {
                code: 400,
                success: false,
                message: 'No author found',
            };
        }
        await Authors_1.Authors.delete(id_authors);
        return {
            code: 200,
            success: true,
            message: 'Delete authors success',
        };
    }
    async updateAuthors(author, id_authors) {
        const authorExist = await Authors_1.Authors.findOne({
            where: {
                id_authors
            }
        });
        if (!authorExist) {
            return {
                code: 400,
                success: false,
                message: 'No author found',
            };
        }
        const updateAuthor = await Authors_1.Authors.save(Object.assign(Object.assign({}, author), { id_authors }));
        return {
            code: 200,
            success: true,
            message: 'Add author success',
            data: updateAuthor
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Authors_1.Authors]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorsResolver.prototype, "authors", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('author')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.AuthorInput]),
    __metadata("design:returntype", Promise)
], AuthorsResolver.prototype, "addAuthors", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id_authors')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthorsResolver.prototype, "deleteAuthors", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('author')),
    __param(1, (0, type_graphql_1.Arg)('id_authors')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.AuthorInput, String]),
    __metadata("design:returntype", Promise)
], AuthorsResolver.prototype, "updateAuthors", null);
AuthorsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AuthorsResolver);
exports.AuthorsResolver = AuthorsResolver;
//# sourceMappingURL=authors.js.map