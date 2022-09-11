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
exports.Receipt = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Librarian_1 = require("./Librarian");
const ReceiptDetails_1 = require("./ReceiptDetails");
let Receipt = class Receipt extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Receipt.prototype, "id_receipt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Receipt.prototype, "create_time", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Librarian_1.Librarian, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Librarian_1.Librarian, (librarian) => librarian.liquidations),
    (0, typeorm_1.JoinColumn)({ name: 'id_librarian' }),
    __metadata("design:type", Librarian_1.Librarian)
], Receipt.prototype, "librarian", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ReceiptDetails_1.ReceiptDetails], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => ReceiptDetails_1.ReceiptDetails, (receiptDetail) => receiptDetail.id_receipt),
    __metadata("design:type", Array)
], Receipt.prototype, "receiptToTitle", void 0);
Receipt = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Receipt);
exports.Receipt = Receipt;
//# sourceMappingURL=Receipt.js.map