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
exports.BorrowDetails = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const BookBorrow_1 = require("./BookBorrow");
const Librarian_1 = require("./Librarian");
let BorrowDetails = class BorrowDetails extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], BorrowDetails.prototype, "id_borrow", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], BorrowDetails.prototype, "id_book", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], BorrowDetails.prototype, "expired", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "smallint", default: 0 }),
    __metadata("design:type", Number)
], BorrowDetails.prototype, "borrow_status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "smallint", default: 0 }),
    __metadata("design:type", Number)
], BorrowDetails.prototype, "number_renewal", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], BorrowDetails.prototype, "date_return_book", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Librarian_1.Librarian, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Librarian_1.Librarian, (librarian) => librarian.borrowDetails),
    (0, typeorm_1.JoinColumn)({ name: 'id_librarian' }),
    __metadata("design:type", Librarian_1.Librarian)
], BorrowDetails.prototype, "librarian", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Book_1.Book, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'book' }),
    (0, typeorm_1.ManyToOne)(() => Book_1.Book, (books) => books.borrowToBook),
    __metadata("design:type", Book_1.Book)
], BorrowDetails.prototype, "books", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => BookBorrow_1.BookBorrow, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'book_borrow' }),
    (0, typeorm_1.ManyToOne)(() => BookBorrow_1.BookBorrow, (book_borrow) => book_borrow.borrowToBook),
    __metadata("design:type", BookBorrow_1.BookBorrow)
], BorrowDetails.prototype, "bookBorrow", void 0);
BorrowDetails = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('borrow_details')
], BorrowDetails);
exports.BorrowDetails = BorrowDetails;
//# sourceMappingURL=BorrowDetails.js.map