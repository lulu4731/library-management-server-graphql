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
exports.BookBorrow = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const BorrowDetails_1 = require("./BorrowDetails");
const Librarian_1 = require("./Librarian");
const readers_1 = require("./readers");
let BookBorrow = class BookBorrow extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], BookBorrow.prototype, "id_borrow", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], BookBorrow.prototype, "create_time", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => readers_1.Readers, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => readers_1.Readers, (reader) => reader.bookBorrow, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_reader' }),
    __metadata("design:type", readers_1.Readers)
], BookBorrow.prototype, "reader", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Librarian_1.Librarian, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Librarian_1.Librarian, (librarian) => librarian.bookBorrow, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_librarian' }),
    __metadata("design:type", Librarian_1.Librarian)
], BookBorrow.prototype, "librarian", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BorrowDetails_1.BorrowDetails], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => BorrowDetails_1.BorrowDetails, (borrowDetails) => borrowDetails.bookBorrow),
    __metadata("design:type", Array)
], BookBorrow.prototype, "borrowToBook", void 0);
BookBorrow = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], BookBorrow);
exports.BookBorrow = BookBorrow;
//# sourceMappingURL=BookBorrow.js.map