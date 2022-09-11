import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { Titles } from "../entities/Titles";
import { MutationResponseTitle, TitleInput } from "../types/interface";
import { Category } from "../entities/Category";
import { Company } from "../entities/Company";
import { Authors } from "../entities/Authors";
import { Book } from "../entities/Book";

@Resolver()
export class TitlesResolver {
    @Query(() => [Titles])
    @UseMiddleware(checkAuth)
    async titles(): Promise<Titles[]> {
        return await Titles.find({
            relations: {
                category: true,
                company: true,
                authors: true
            }
        })
    }

    @Mutation(_return => MutationResponseTitle)
    @UseMiddleware(checkAuth)
    async addTitles(
        @Arg('title') title: TitleInput
    ): Promise<MutationResponseTitle> {
        try {
            const { name_title, id_titles, page, publishing_year, id_category, id_company, authors } = title

            const nameExist = await Titles.findOne({
                where: {
                    name_title
                }
            })


            if (nameExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated name title',
                }
            }

            const category = await Category.findOneBy({ id_category: id_category })
            const company = await Company.findOneBy({ id_company: id_company })
            let listAuthors: Authors[] = []
            for (let id_authors of authors) {
                const author = await Authors.findOneBy({ id_authors: id_authors as string })
                listAuthors.push(author as Authors)
            }

            const newTitle = Titles.create({
                id_titles,
                name_title,
                page,
                publishing_year,
                company: company as Company,
                category: category as Category,
                authors: listAuthors
            })
            await newTitle.save()

            return {
                code: 200,
                success: true,
                message: 'Add title success',

                data: newTitle
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            }
        }
    }

    @Mutation(_return => MutationResponseTitle)
    @UseMiddleware(checkAuth)
    async deleteTitle(
        @Arg('id_titles') id_titles: string
    ): Promise<MutationResponseTitle> {
        try {
            const titlesExist = await Titles.findOne({
                where: {
                    id_titles
                }
            })

            if (!titlesExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'No titles found',
                }
            }

            // kiem tra title co sach chua
            const titlesBookExist = await Book.findOne({
                where: {
                    id_titles
                }
            })

            if (titlesBookExist) {
                return {
                    code: 400,
                    success: true,
                    message: 'The title of the book already has a book that cannot be deleted',
                }
            }

            await Titles.delete(id_titles)

            return {
                code: 200,
                success: true,
                message: 'Delete titles success',
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            }
        }
    }

    @Mutation(_return => MutationResponseTitle)
    @UseMiddleware(checkAuth)
    async updateTitles(
        @Arg('title') title: TitleInput
    ): Promise<MutationResponseTitle> {
        try {
            const { name_title, id_titles, page, publishing_year, id_category, id_company, authors } = title

            const nameExist = await Titles.findOne({
                where: {
                    name_title
                }
            })


            if (nameExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated name title',
                }
            }

            const category = await Category.findOneBy({ id_category: id_category })
            const company = await Company.findOneBy({ id_company: id_company })
            let listAuthors: Authors[] = []
            for (let id_authors of authors) {
                const author = await Authors.findOneBy({ id_authors: id_authors as string })
                listAuthors.push(author as Authors)
            }

            const newTitle = {
                id_titles,
                name_title,
                page,
                publishing_year,
                company: company as Company,
                category: category as Category,
                authors: listAuthors,
            }
            const updateTitle = await Titles.save(newTitle as Titles)

            return {
                code: 200,
                success: true,
                message: 'Update title success',

                data: updateTitle
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            }
        }
    }
}