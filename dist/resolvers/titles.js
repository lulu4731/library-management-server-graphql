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
exports.TitlesResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const Titles_1 = require("../entities/Titles");
const interface_1 = require("../types/interface");
const Category_1 = require("../entities/Category");
const Company_1 = require("../entities/Company");
const Authors_1 = require("../entities/Authors");
const Book_1 = require("../entities/Book");
let TitlesResolver = class TitlesResolver {
    async titles() {
        return await Titles_1.Titles.find({
            relations: {
                category: true,
                company: true,
                authors: true
            }
        });
    }
    async addTitles(title) {
        try {
            const { name_title, id_titles, page, publishing_year, id_category, id_company, authors } = title;
            const nameExist = await Titles_1.Titles.findOne({
                where: {
                    name_title
                }
            });
            if (nameExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated name title',
                };
            }
            const category = await Category_1.Category.findOneBy({ id_category: id_category });
            const company = await Company_1.Company.findOneBy({ id_company: id_company });
            let listAuthors = [];
            for (let id_authors of authors) {
                const author = await Authors_1.Authors.findOneBy({ id_authors: id_authors });
                listAuthors.push(author);
            }
            const newTitle = Titles_1.Titles.create({
                id_titles,
                name_title,
                page,
                publishing_year,
                company: company,
                category: category,
                authors: listAuthors
            });
            await newTitle.save();
            return {
                code: 200,
                success: true,
                message: 'Add title success',
                data: newTitle
            };
        }
        catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            };
        }
    }
    async deleteTitle(id_titles) {
        try {
            const titlesExist = await Titles_1.Titles.findOne({
                where: {
                    id_titles
                }
            });
            if (!titlesExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'No titles found',
                };
            }
            const titlesBookExist = await Book_1.Book.findOne({
                where: {
                    id_titles
                }
            });
            if (titlesBookExist) {
                return {
                    code: 400,
                    success: true,
                    message: 'The title of the book already has a book that cannot be deleted',
                };
            }
            await Titles_1.Titles.delete(id_titles);
            return {
                code: 200,
                success: true,
                message: 'Delete titles success',
            };
        }
        catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            };
        }
    }
    async updateTitles(title) {
        try {
            const { name_title, id_titles, page, publishing_year, id_category, id_company, authors } = title;
            const nameExist = await Titles_1.Titles.findOne({
                where: {
                    name_title
                }
            });
            if (nameExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated name title',
                };
            }
            const category = await Category_1.Category.findOneBy({ id_category: id_category });
            const company = await Company_1.Company.findOneBy({ id_company: id_company });
            let listAuthors = [];
            for (let id_authors of authors) {
                const author = await Authors_1.Authors.findOneBy({ id_authors: id_authors });
                listAuthors.push(author);
            }
            const newTitle = {
                id_titles,
                name_title,
                page,
                publishing_year,
                company: company,
                category: category,
                authors: listAuthors,
            };
            const updateTitle = await Titles_1.Titles.save(newTitle);
            return {
                code: 200,
                success: true,
                message: 'Update title success',
                data: updateTitle
            };
        }
        catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Titles_1.Titles]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TitlesResolver.prototype, "titles", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseTitle),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.TitleInput]),
    __metadata("design:returntype", Promise)
], TitlesResolver.prototype, "addTitles", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseTitle),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id_titles')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TitlesResolver.prototype, "deleteTitle", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseTitle),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.TitleInput]),
    __metadata("design:returntype", Promise)
], TitlesResolver.prototype, "updateTitles", null);
TitlesResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TitlesResolver);
exports.TitlesResolver = TitlesResolver;
//# sourceMappingURL=titles.js.map