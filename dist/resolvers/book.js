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
exports.BooksResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const Book_1 = require("../entities/Book");
const interface_1 = require("../types/interface");
let BooksResolver = class BooksResolver {
    async books() {
        return await Book_1.Book.find({
            relations: {
                bookStatus: true,
                id_titles: true
            }
        });
    }
    async updateBook(position, id_book) {
        try {
            const bookExist = await Book_1.Book.findOneBy({
                id_book,
            });
            if (!bookExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'No book found',
                };
            }
            const updateBook = await Book_1.Book.save(Object.assign(Object.assign({}, bookExist), { position: position }));
            return {
                code: 200,
                success: true,
                message: 'Update book success',
                data: updateBook
            };
        }
        catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Book_1.Book]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksResolver.prototype, "books", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseBooks),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('position')),
    __param(1, (0, type_graphql_1.Arg)('id_book')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BooksResolver.prototype, "updateBook", null);
BooksResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BooksResolver);
exports.BooksResolver = BooksResolver;
//# sourceMappingURL=book.js.map