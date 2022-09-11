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
exports.ReceiptDetails = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Receipt_1 = require("./Receipt");
const Titles_1 = require("./Titles");
let ReceiptDetails = class ReceiptDetails extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ReceiptDetails.prototype, "number_book", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "numeric", default: 0 }),
    __metadata("design:type", Number)
], ReceiptDetails.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Receipt_1.Receipt),
    (0, typeorm_1.PrimaryColumn)("uuid"),
    (0, typeorm_1.JoinColumn)({ name: 'id_receipt' }),
    (0, typeorm_1.ManyToOne)(() => Receipt_1.Receipt, (receipt) => receipt.receiptToTitle),
    __metadata("design:type", String)
], ReceiptDetails.prototype, "id_receipt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Titles_1.Titles),
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.JoinColumn)({ name: 'id_titles' }),
    (0, typeorm_1.ManyToOne)(() => Titles_1.Titles, (title) => title.receiptToTitle),
    __metadata("design:type", String)
], ReceiptDetails.prototype, "id_titles", void 0);
ReceiptDetails = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('receipt_details')
], ReceiptDetails);
exports.ReceiptDetails = ReceiptDetails;
//# sourceMappingURL=ReceiptDetails.js.map