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
exports.CompanyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../middleware/checkAuth");
const interface_1 = require("../types/interface");
const Company_1 = require("../entities/Company");
let CompanyResolver = class CompanyResolver {
    async company() {
        return await Company_1.Company.find();
    }
    async addCompany(company) {
        const { email, phone, name_company } = company;
        const nameCompanyExist = await Company_1.Company.findOne({
            where: {
                name_company
            }
        });
        const phoneExist = await Company_1.Company.findOne({
            where: {
                phone
            }
        });
        const emailExist = await Company_1.Company.findOne({
            where: {
                email
            }
        });
        if (nameCompanyExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated name company',
            };
        }
        if (emailExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated email',
            };
        }
        if (phoneExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated phone',
            };
        }
        const newCompany = Company_1.Company.create(Object.assign({}, company));
        await newCompany.save();
        return {
            code: 200,
            success: true,
            message: 'Add company success',
            data: newCompany
        };
    }
    async deleteCompany(id_company) {
        const companyExist = await Company_1.Company.findOne({
            where: {
                id_company
            }
        });
        if (!companyExist) {
            return {
                code: 400,
                success: false,
                message: 'No company found',
            };
        }
        await Company_1.Company.delete(id_company);
        return {
            code: 200,
            success: true,
            message: 'Delete company success',
        };
    }
    async updateCompany(id_company, company) {
        const { email, phone, name_company } = company;
        const companyById = await Company_1.Company.findOneBy({
            id_company
        });
        if (!companyById) {
            return {
                code: 400,
                success: false,
                message: 'No readers found',
            };
        }
        const emailOldExist = await Company_1.Company.findOne({
            where: {
                id_company,
                email
            }
        });
        const phoneOldExist = await Company_1.Company.findOne({
            where: {
                id_company,
                phone
            }
        });
        const nameCompanyExist = await Company_1.Company.findOne({
            where: {
                id_company,
                name_company
            }
        });
        if (!emailOldExist) {
            const emailExist = await Company_1.Company.findOne({
                where: {
                    email
                }
            });
            if (emailExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated email',
                };
            }
        }
        if (!phoneOldExist) {
            const phoneExist = await Company_1.Company.findOne({
                where: {
                    phone
                }
            });
            if (phoneExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated phone',
                };
            }
        }
        if (!nameCompanyExist) {
            const nameCompanyExist = await Company_1.Company.findOne({
                where: {
                    name_company
                }
            });
            if (nameCompanyExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated phone',
                };
            }
        }
        const updateCompany = await Company_1.Company.save(Object.assign(Object.assign({}, company), { id_company }));
        return {
            code: 200,
            success: true,
            message: 'Update company success',
            data: updateCompany
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Company_1.Company]),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "company", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseCompany),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interface_1.CompanyInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "addCompany", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseCompany),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id_company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "deleteCompany", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => interface_1.MutationResponseCompany),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id_company')),
    __param(1, (0, type_graphql_1.Arg)('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, interface_1.CompanyInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "updateCompany", null);
CompanyResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CompanyResolver);
exports.CompanyResolver = CompanyResolver;
//# sourceMappingURL=company.js.map