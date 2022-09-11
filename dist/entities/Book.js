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
exports.Book = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BookStatus_1 = require("./BookStatus");
const BorrowDetails_1 = require("./BorrowDetails");
const Liquidation_1 = require("./Liquidation");
const Titles_1 = require("./Titles");
let Book = class Book extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Book.prototype, "id_book", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "position", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Liquidation_1.Liquidations, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Liquidation_1.Liquidations, (liquidation) => liquidation.books),
    (0, typeorm_1.JoinColumn)({ name: 'id_liquidation' }),
    __metadata("design:type", Liquidation_1.Liquidations)
], Book.prototype, "id_liquidation", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Titles_1.Titles, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Titles_1.Titles, (title) => title.books),
    (0, typeorm_1.JoinColumn)({ name: 'id_titles' }),
    __metadata("design:type", String)
], Book.prototype, "id_titles", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => BookStatus_1.BookStatus, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => BookStatus_1.BookStatus, (bookStatus) => bookStatus.books),
    (0, typeorm_1.JoinColumn)({ name: 'id_status' }),
    __metadata("design:type", String)
], Book.prototype, "bookStatus", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BorrowDetails_1.BorrowDetails], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => BorrowDetails_1.BorrowDetails, (borrowDetails) => borrowDetails.books),
    __metadata("design:type", Array)
], Book.prototype, "borrowToBook", void 0);
Book = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Book);
exports.Book = Book;
//# sourceMappingURL=Book.js.map