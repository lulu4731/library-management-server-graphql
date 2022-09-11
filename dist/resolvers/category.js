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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const interface_1 = require("../types/interface");
const Category_1 = require("../entities/Category");
let CategoryResolver = class CategoryResolver {
    async category() {
        return await Category_1.Category.find({
            relations: {
                titles: {
                    authors: true,
                    category: true,
                    company: true
                }
            }
        });
    }
    async addCategory(name_category) {
        const categoryExist = await Category_1.Category.findOne({
            where: {
                name_category
            }
        });
        if (categoryExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated name category',
            };
        }
        const newCategory = Category_1.Category.create({ name_category });
        await newCategory.save();
        return {
            code: 200,
            success: true,
            message: 'Add author success',
            data: newCategory
        };
    }
    async deleteCategory(id_category) {
        const categoryExist = await Category_1.Category.findOne({
            where: {
                id_category
            }
        });
        if (!categoryExist) {
            return {
                code: 400,
                success: false,
                message: 'No category found',
            };
        }
        await Category_1.Category.delete(id_category);
        return {
            code: 200,
            success: true,
            message: 'Delete category success',
        };
    }
    async updateCategory(name_category, id_category) {
        console.log(name_category);
        const categoryExist = await Category_1.Category.findOneBy({
            id_category
        });
        if (!categoryExist) {
            return {
                code: 400,
                success: false,
                message: 'No category found',
            };
        }
        const nameCategoryOldExist = await Category_1.Category.findOne({
            where: {
                id_category,
                name_category
            }
        });
        if (!nameCategoryOldExist) {
            const nameCategoryExist = await Category_1.Category.findOne({
                where: {
                    name_category
                }
            });
            if (nameCategoryExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated name category',
                };
            }
        }
        const updateAuthor = await Category_1.Category.save({ id_category, name_category });
        return {
            code: 200,
            success: true,
            message: 'Update category success',
            data: updateAuthor
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Category_1.Category]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseCategory),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('name_category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "addCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseCategory),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id_category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseCategory),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('name_category')),
    __param(1, (0, type_graphql_1.Arg)('id_category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
//# sourceMappingURL=category.js.map