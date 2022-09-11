import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { CompanyInput, MutationResponseCompany } from "../types/interface";
import { Company } from "../entities/Company";

@Resolver()
export class CompanyResolver {
    @Query(() => [Company])
    @UseMiddleware(checkAuth)
    async company(): Promise<Company[]> {
        return await Company.find()
    }

    @Mutation(_return => MutationResponseCompany)
    @UseMiddleware(checkAuth)
    async addCompany(
        @Arg('company') company: CompanyInput
    ): Promise<MutationResponseCompany> {
        const { email, phone, name_company } = company

        const nameCompanyExist = await Company.findOne({
            where: {
                name_company
            }
        })

        const phoneExist = await Company.findOne({
            where: {
                phone
            }
        })

        const emailExist = await Company.findOne({
            where: {
                email
            }
        })

        if (nameCompanyExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated name company',
            }
        }

        if (emailExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated email',
            }
        }

        if (phoneExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated phone',
            }
        }


        const newCompany = Company.create({ ...company })
        await newCompany.save()

        return {
            code: 200,
            success: true,
            message: 'Add company success',

            data: newCompany
        }
    }

    @Mutation(_return => MutationResponseCompany)
    @UseMiddleware(checkAuth)
    async deleteCompany(
        @Arg('id_company') id_company: string
    ): Promise<MutationResponseCompany> {
        const companyExist = await Company.findOne({
            where: {
                id_company
            }
        })

        if (!companyExist) {
            return {
                code: 400,
                success: false,
                message: 'No company found',
            }
        }

        await Company.delete(id_company)

        return {
            code: 200,
            success: true,
            message: 'Delete company success',
        }
    }

    @Mutation(_return => MutationResponseCompany)
    @UseMiddleware(checkAuth)
    async updateCompany(
        @Arg('id_company') id_company: string,
        @Arg('company') company: CompanyInput
    ): Promise<MutationResponseCompany> {
        const { email, phone, name_company } = company

        const companyById = await Company.findOneBy({
            id_company
        })

        if (!companyById) {
            return {
                code: 400,
                success: false,
                message: 'No readers found',
            }
        }

        const emailOldExist = await Company.findOne({
            where: {
                id_company,
                email
            }
        })

        const phoneOldExist = await Company.findOne({
            where: {
                id_company,
                phone
            }
        })

        const nameCompanyExist = await Company.findOne({
            where: {
                id_company,
                name_company
            }
        })


        if (!emailOldExist) {
            const emailExist = await Company.findOne({
                where: {
                    email
                }
            })
            if (emailExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated email',
                }
            }
        }

        if (!phoneOldExist) {
            const phoneExist = await Company.findOne({
                where: {
                    phone
                }
            })
            if (phoneExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated phone',
                }
            }
        }

        if (!nameCompanyExist) {
            const nameCompanyExist = await Company.findOne({
                where: {
                    name_company
                }
            })
            if (nameCompanyExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated phone',
                }
            }
        }

        const updateCompany = await Company.save({ ...company, id_company })

        return {
            code: 200,
            success: true,
            message: 'Update company success',

            data: updateCompany
        }
    }
}