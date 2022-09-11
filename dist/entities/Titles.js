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
exports.Titles = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Authors_1 = require("./Authors");
const Book_1 = require("./Book");
const Category_1 = require("./Category");
const Company_1 = require("./Company");
const ReceiptDetails_1 = require("./ReceiptDetails");
let Titles = class Titles extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Titles.prototype, "id_titles", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Titles.prototype, "name_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], Titles.prototype, "page", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Titles.prototype, "publishing_year", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Category_1.Category, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.titles),
    (0, typeorm_1.JoinColumn)({ name: 'id_category' }),
    __metadata("design:type", Category_1.Category)
], Titles.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Company_1.Company, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Company_1.Company, (company) => company.titles),
    (0, typeorm_1.JoinColumn)({ name: 'id_company' }),
    __metadata("design:type", Company_1.Company)
], Titles.prototype, "company", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Authors_1.Authors], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => Authors_1.Authors),
    (0, typeorm_1.JoinTable)({
        name: 'composed',
        joinColumn: {
            name: 'id_titles',
            referencedColumnName: 'id_titles'
        },
        inverseJoinColumn: {
            name: 'id_authors',
            referencedColumnName: 'id_authors'
        }
    }),
    __metadata("design:type", Array)
], Titles.prototype, "authors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ReceiptDetails_1.ReceiptDetails], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => ReceiptDetails_1.ReceiptDetails, (receiptDetail) => receiptDetail.id_titles),
    __metadata("design:type", Array)
], Titles.prototype, "receiptToTitle", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Book_1.Book], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Book_1.Book, (book) => book.id_titles),
    __metadata("design:type", Array)
], Titles.prototype, "books", void 0);
Titles = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Titles);
exports.Titles = Titles;
//# sourceMappingURL=Titles.js.map