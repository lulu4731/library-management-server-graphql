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
exports.LibrarianMutationResponse = void 0;
const type_graphql_1 = require("type-graphql");
const Librarian_1 = require("../entities/Librarian");
const MutationRespone_1 = require("./MutationRespone");
let LibrarianMutationResponse = class LibrarianMutationResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Librarian_1.Librarian)
], LibrarianMutationResponse.prototype, "librarian", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LibrarianMutationResponse.prototype, "accessToken", void 0);
LibrarianMutationResponse = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: MutationRespone_1.IMutationResponse })
], LibrarianMutationResponse);
exports.LibrarianMutationResponse = LibrarianMutationResponse;
//# sourceMappingURL=LibrarianMutationResponse.js.map