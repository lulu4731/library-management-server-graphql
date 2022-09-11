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
exports.Category = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Titles_1 = require("./Titles");
let Category = class Category extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Category.prototype, "id_category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Category.prototype, "name_category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Titles_1.Titles], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Titles_1.Titles, (titles) => titles.category),
    __metadata("design:type", Array)
], Category.prototype, "titles", void 0);
Category = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map