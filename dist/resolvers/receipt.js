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
exports.ReceiptResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const Receipt_1 = require("../entities/Receipt");
const interface_1 = require("../types/interface");
const Librarian_1 = require("../entities/Librarian");
const ReceiptDetails_1 = require("../entities/ReceiptDetails");
const Book_1 = require("../entities/Book");
let ReceiptResolver = class ReceiptResolver {
    async receipts() {
        return await Receipt_1.Receipt.find({
            relations: {
                librarian: true,
                receiptToTitle: {
                    id_titles: true
                }
            }
        });
    }
    async addReceipt({ librarian }, { receiptDetails }) {
        try {
            const lib = await Librarian_1.Librarian.findOneBy({ id_librarian: librarian.userId });
            const newReceipt = await Receipt_1.Receipt.create({
                librarian: lib
            }).save();
            for (let item of receiptDetails) {
                await ReceiptDetails_1.ReceiptDetails.create({
                    id_receipt: newReceipt.id_receipt,
                    id_titles: item.id_titles,
                    number_book: item.number_book,
                    price: item.price,
                }).save();
                for (let i = 0; i < item.number_book; i++) {
                    await Book_1.Book.create({
                        id_titles: item.id_titles,
                        bookStatus: "50cd612b-eb93-4127-82e1-347d114cdcd5",
                        position: ''
                    }).save();
                }
            }
            return {
                code: 200,
                success: true,
                message: 'Add receipt success',
                data: newReceipt
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
    (0, type_graphql_1.Query)(() => [Receipt_1.Receipt]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReceiptResolver.prototype, "receipts", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseReceipt),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('receiptDetails')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, interface_1.ReceiptInput]),
    __metadata("design:returntype", Promise)
], ReceiptResolver.prototype, "addReceipt", null);
ReceiptResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReceiptResolver);
exports.ReceiptResolver = ReceiptResolver;
//# sourceMappingURL=receipt.js.map