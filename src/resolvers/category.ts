import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { MutationResponseCategory } from "../types/interface";
import { Category } from "../entities/Category";

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    @UseMiddleware(checkAuth)
    async category(): Promise<Category[]> {
        return await Category.find({
            relations: {
                titles: {
                    authors: true,
                    category: true,
                    company: true
                }
            }
        })
    }

    @Mutation(_return => MutationResponseCategory)
    @UseMiddleware(checkAuth)
    async addCategory(
        @Arg('name_category') name_category: string
    ): Promise<MutationResponseCategory> {

        const categoryExist = await Category.findOne({
            where: {
                name_category
            }
        })

        if (categoryExist) {
            return {
                code: 400,
                success: false,
                message: 'Duplicated name category',
            }
        }

        const newCategory = Category.create({ name_category })
        await newCategory.save()

        return {
            code: 200,
            success: true,
            message: 'Add author success',

            data: newCategory
        }
    }

    @Mutation(_return => MutationResponseCategory)
    @UseMiddleware(checkAuth)
    async deleteCategory(
        @Arg('id_category') id_category: string
    ): Promise<MutationResponseCategory> {
        const categoryExist = await Category.findOne({
            where: {
                id_category
            }
        })

        if (!categoryExist) {
            return {
                code: 400,
                success: false,
                message: 'No category found',
            }
        }

        await Category.delete(id_category)

        return {
            code: 200,
            success: true,
            message: 'Delete category success',
        }
    }

    @Mutation(_return => MutationResponseCategory)
    @UseMiddleware(checkAuth)
    async updateCategory(
        @Arg('name_category') name_category: string,
        @Arg('id_category') id_category: string
    ): Promise<MutationResponseCategory> {
        console.log(name_category)

        const categoryExist = await Category.findOneBy({
            id_category
        })

        if (!categoryExist) {
            return {
                code: 400,
                success: false,
                message: 'No category found',
            }
        }

        const nameCategoryOldExist = await Category.findOne({
            where: {
                id_category,
                name_category
            }
        })

        if (!nameCategoryOldExist) {
            const nameCategoryExist = await Category.findOne({
                where: {
                    name_category
                }
            })

            if (nameCategoryExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated name category',
                }
            }
        }

        const updateAuthor = await Category.save({ id_category, name_category })

        return {
            code: 200,
            success: true,
            message: 'Update category success',

            data: updateAuthor
        }
    }
}