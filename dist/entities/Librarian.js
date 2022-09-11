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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Librarian = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BookBorrow_1 = require("./BookBorrow");
const BorrowDetails_1 = require("./BorrowDetails");
const Liquidation_1 = require("./Liquidation");
const Receipt_1 = require("./Receipt");
let Librarian = class Librarian extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Librarian.prototype, "id_librarian", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Librarian.prototype, "first_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Librarian.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Librarian.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint", default: 0 }),
    __metadata("design:type", String)
], Librarian.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Librarian.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 15 }),
    __metadata("design:type", String)
], Librarian.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Librarian.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Librarian.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Liquidation_1.Liquidations], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Liquidation_1.Liquidations, (liquidation) => liquidation.librarian),
    __metadata("design:type", Array)
], Librarian.prototype, "liquidations", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Receipt_1.Receipt], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Receipt_1.Receipt, (liquidation) => liquidation.librarian),
    __metadata("design:type", Array)
], Librarian.prototype, "receipts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BookBorrow_1.BookBorrow], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => BookBorrow_1.BookBorrow, (bookBorrow) => bookBorrow.librarian),
    __metadata("design:type", Array)
], Librarian.prototype, "bookBorrow", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BorrowDetails_1.BorrowDetails], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => BorrowDetails_1.BorrowDetails, (borrowDetails) => borrowDetails.librarian),
    __metadata("design:type", Array)
], Librarian.prototype, "borrowDetails", void 0);
Librarian = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Librarian);
exports.Librarian = Librarian;
//# sourceMappingURL=Librarian.js.map