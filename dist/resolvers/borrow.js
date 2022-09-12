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
exports.BorrowsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const BookBorrow_1 = require("../entities/BookBorrow");
const interface_1 = require("../types/interface");
const Librarian_1 = require("../entities/Librarian");
const readers_1 = require("../entities/readers");
const BorrowDetails_1 = require("../entities/BorrowDetails");
const typeorm_1 = require("typeorm");
let BorrowsResolver = class BorrowsResolver {
    async borrows() {
        const readerExist = await (0, typeorm_1.getRepository)("book_borrow").createQueryBuilder("book_borrow").innerJoin("book_borrow.borrowToBook", "bookBorrow", "bookBorrow.borrow_status = 0").where("book_borrow.reader = :reader", { reader: "e2c5d5c5-65e5-47d5-8e6a-fd91cc7d4bef" }).getCount();
        console.log(readerExist);
        return await BookBorrow_1.BookBorrow.find();
    }
    async addBorrow({ librarian }, id_readers, titles) {
        try {
            const lib = await Librarian_1.Librarian.findOneBy({ id_librarian: librarian.userId });
            const reader = await readers_1.Readers.findOneBy({ id_readers });
            const newBorrows = await BookBorrow_1.BookBorrow.create({
                librarian: lib,
                reader: reader
            }).save();
            for (let item of titles) {
                console.log(item);
                await BorrowDetails_1.BorrowDetails.create({
                    bookBorrow: newBorrows,
                }).save();
            }
            return {
                code: 200,
                success: true,
                message: 'Add receipt success',
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
    (0, type_graphql_1.Query)(() => [BookBorrow_1.BookBorrow]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BorrowsResolver.prototype, "borrows", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseBorrows),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('id_readers')),
    __param(2, (0, type_graphql_1.Arg)('titles', _return => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array]),
    __metadata("design:returntype", Promise)
], BorrowsResolver.prototype, "addBorrow", null);
BorrowsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BorrowsResolver);
exports.BorrowsResolver = BorrowsResolver;
//# sourceMappingURL=borrow.js.map