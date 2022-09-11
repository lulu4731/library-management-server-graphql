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
exports.ReceiptInput = exports.IReceiptDetail = exports.MutationResponseReceipt = exports.LiquidationInput = exports.MutationResponseLiquidation = exports.TitleInput = exports.MutationResponseTitle = exports.CompanyInput = exports.MutationResponseCompany = exports.AuthorInput = exports.ReaderInput = exports.MutationResponseCategory = exports.MutationResponse = void 0;
const readers_1 = require("../entities/readers");
const type_graphql_1 = require("type-graphql");
const MutationRespone_1 = require("./MutationRespone");
const Librarian_1 = require("../entities/Librarian");
const Authors_1 = require("../entities/Authors");
const Category_1 = require("../entities/Category");
const Company_1 = require("../entities/Company");
const Titles_1 = require("../entities/Titles");
const Receipt_1 = require("../entities/Receipt");
let MutationResponse = class MutationResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Authors_1.Authors || readers_1.Readers || Librarian_1.Librarian),
    __metadata("design:type", Object)
], MutationResponse.prototype, "data", void 0);
MutationResponse = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: MutationRespone_1.IMutationResponse })
], MutationResponse);
exports.MutationResponse = MutationResponse;
let MutationResponseCategory = class MutationResponseCategory {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Category_1.Category)
], MutationResponseCategory.prototype, "data", void 0);
MutationResponseCategory = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: MutationRespone_1.IMutationResponse })
], MutationResponseCategory);
exports.MutationResponseCategory = MutationResponseCategory;
let ReaderInput = class ReaderInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReaderInput.prototype, "first_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReaderInput.prototype, "last_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReaderInput.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReaderInput.prototype, "gender", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReaderInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReaderInput.prototype, "citizen_identification", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReaderInput.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReaderInput.prototype, "date_of_birth", void 0);
ReaderInput = __decorate([
    (0, type_graphql_1.InputType)()
], ReaderInput);
exports.ReaderInput = ReaderInput;
let AuthorInput = class AuthorInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AuthorInput.prototype, "first_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AuthorInput.prototype, "last_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AuthorInput.prototype, "gender", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AuthorInput.prototype, "date_of_birth", void 0);
AuthorInput = __decorate([
    (0, type_graphql_1.InputType)()
], AuthorInput);
exports.AuthorInput = AuthorInput;
let MutationResponseCompany = class MutationResponseCompany {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Company_1.Company)
], MutationResponseCompany.prototype, "data", void 0);
MutationResponseCompany = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: MutationRespone_1.IMutationResponse })
], MutationResponseCompany);
exports.MutationResponseCompany = MutationResponseCompany;
let CompanyInput = class CompanyInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CompanyInput.prototype, "name_company", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CompanyInput.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CompanyInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CompanyInput.prototype, "phone", void 0);
CompanyInput = __decorate([
    (0, type_graphql_1.InputType)()
], CompanyInput);
exports.CompanyInput = CompanyInput;
let MutationResponseTitle = class MutationResponseTitle {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Titles_1.Titles)
], MutationResponseTitle.prototype, "data", void 0);
MutationResponseTitle = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: MutationRespone_1.IMutationResponse })
], MutationResponseTitle);
exports.MutationResponseTitle = MutationResponseTitle;
let TitleInput = class TitleInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TitleInput.prototype, "id_titles", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TitleInput.prototype, "name_title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TitleInput.prototype, "page", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], TitleInput.prototype, "publishing_year", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TitleInput.prototype, "id_category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], TitleInput.prototype, "id_company", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], TitleInput.prototype, "authors", void 0);
TitleInput = __decorate([
    (0, type_graphql_1.InputType)()
], TitleInput);
exports.TitleInput = TitleInput;
let MutationResponseLiquidation = class MutationResponseLiquidation {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Titles_1.Titles)
], MutationResponseLiquidation.prototype, "data", void 0);
MutationResponseLiquidation = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: MutationRespone_1.IMutationResponse })
], MutationResponseLiquidation);
exports.MutationResponseLiquidation = MutationResponseLiquidation;
let LiquidationInput = class LiquidationInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LiquidationInput.prototype, "id_librarian", void 0);
LiquidationInput = __decorate([
    (0, type_graphql_1.InputType)()
], LiquidationInput);
exports.LiquidationInput = LiquidationInput;
let MutationResponseReceipt = class MutationResponseReceipt {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Receipt_1.Receipt)
], MutationResponseReceipt.prototype, "data", void 0);
MutationResponseReceipt = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: MutationRespone_1.IMutationResponse })
], MutationResponseReceipt);
exports.MutationResponseReceipt = MutationResponseReceipt;
let IReceiptDetail = class IReceiptDetail {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IReceiptDetail.prototype, "id_titles", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], IReceiptDetail.prototype, "number_book", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], IReceiptDetail.prototype, "price", void 0);
IReceiptDetail = __decorate([
    (0, type_graphql_1.InputType)()
], IReceiptDetail);
exports.IReceiptDetail = IReceiptDetail;
let ReceiptInput = class ReceiptInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => [IReceiptDetail]),
    __metadata("design:type", Array)
], ReceiptInput.prototype, "receiptDetails", void 0);
ReceiptInput = __decorate([
    (0, type_graphql_1.InputType)()
], ReceiptInput);
exports.ReceiptInput = ReceiptInput;
//# sourceMappingURL=interface.js.map