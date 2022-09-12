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
exports.LiquidationsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const Liquidation_1 = require("../entities/Liquidation");
const interface_1 = require("../types/interface");
const Librarian_1 = require("../entities/Librarian");
const Book_1 = require("../entities/Book");
let LiquidationsResolver = class LiquidationsResolver {
    async liquidations() {
        return await Liquidation_1.Liquidations.find({
            relations: {
                librarian: true,
                books: {
                    id_titles: true
                }
            }
        });
    }
    async addLiquidations({ librarian }, books) {
        try {
            const lib = await Librarian_1.Librarian.findOneBy({ id_librarian: librarian.userId });
            const newLiquidations = await Liquidation_1.Liquidations.create({
                librarian: lib
            }).save();
            for (let item of books) {
                const book = await Book_1.Book.findOneBy({ id_book: item });
                await Book_1.Book.save(Object.assign(Object.assign({}, book), { id_liquidation: newLiquidations }));
            }
            return {
                code: 200,
                success: true,
                message: 'Add liquidations success',
                data: newLiquidations
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
    async updateLiquidations({ librarian }, books, id_liquidation) {
        try {
            const lib = await Librarian_1.Librarian.findOneBy({ id_librarian: librarian.userId });
            const liquidation = await Liquidation_1.Liquidations.findOneBy({ id_liquidation });
            const updateLiquidations = await Liquidation_1.Liquidations.save(Object.assign(Object.assign({}, liquidation), { librarian: lib }));
            await Book_1.Book.query(`update book set id_liquidation = null where id_liquidation = '${id_liquidation}'`);
            for (let item of books) {
                const book = await Book_1.Book.findOneBy({ id_book: item });
                await Book_1.Book.save(Object.assign(Object.assign({}, book), { id_liquidation: updateLiquidations }));
            }
            return {
                code: 200,
                success: true,
                message: 'Update liquidations success',
                data: updateLiquidations
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
    (0, type_graphql_1.Query)(() => [Liquidation_1.Liquidations]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LiquidationsResolver.prototype, "liquidations", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseLiquidations),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('books', _return => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], LiquidationsResolver.prototype, "addLiquidations", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseLiquidations),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('books', _return => [String])),
    __param(2, (0, type_graphql_1.Arg)('id_liquidation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, String]),
    __metadata("design:returntype", Promise)
], LiquidationsResolver.prototype, "updateLiquidations", null);
LiquidationsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LiquidationsResolver);
exports.LiquidationsResolver = LiquidationsResolver;
//# sourceMappingURL=liquidations.js.map