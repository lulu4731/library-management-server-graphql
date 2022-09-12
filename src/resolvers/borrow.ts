import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { BookBorrow } from "../entities/BookBorrow";
import { MutationResponseBorrows } from "../types/interface";
import { Context } from "../types/Context";
import { Librarian } from "../entities/Librarian";
import { Readers } from "../entities/readers";
import { BorrowDetails } from "../entities/BorrowDetails";
import { getRepository } from "typeorm";

@Resolver()
export class BorrowsResolver {
    @Query(() => [BookBorrow])
    @UseMiddleware(checkAuth)
    async borrows(): Promise<BookBorrow[]> {
        const readerExist = await getRepository("book_borrow").createQueryBuilder("book_borrow").innerJoin("book_borrow.borrowToBook", "bookBorrow", "bookBorrow.borrow_status = 0").where("book_borrow.reader = :reader", { reader: "e2c5d5c5-65e5-47d5-8e6a-fd91cc7d4bef" }).getCount()
        // const readerExist = await createQueryBuilder("book_borrow").innerJoin("book_borrow.borrowToBook", "bookBorrow").getMany()
        console.log(readerExist)
        return await BookBorrow.find()
    }

    @Mutation(_return => MutationResponseBorrows)
    @UseMiddleware(checkAuth)
    async addBorrow(
        @Ctx() { librarian }: Context,
        @Arg('id_readers') id_readers: string,
        @Arg('titles', _return => [String]) titles: string[]
    ): Promise<MutationResponseBorrows> {
        try {
            const lib = await Librarian.findOneBy({ id_librarian: librarian.userId })
            const reader = await Readers.findOneBy({ id_readers })

            // const readerExist = await createQueryBuilder("book_borrow").innerJoin("book_borrow.borrowToBook", "BB").where("BB.")


            const newBorrows = await BookBorrow.create({
                librarian: lib as Librarian,
                reader: reader as Readers
            }).save()



            for (let item of titles) {
                console.log(item)

                await BorrowDetails.create({
                    bookBorrow: newBorrows,

                }).save()


            }
            return {
                code: 200,
                success: true,
                message: 'Add receipt success',
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            }
        }
    }

    // @Mutation(_return => MutationResponseTitle)
    // @UseMiddleware(checkAuth)
    // async deleteTitle(
    //     @Arg('id_titles') id_titles: string
    // ): Promise<MutationResponseTitle> {
    //     try {
    //         const titlesExist = await Titles.findOne({
    //             where: {
    //                 id_titles
    //             }
    //         })

    //         if (!titlesExist) {
    //             return {
    //                 code: 400,
    //                 success: false,
    //                 message: 'No titles found',
    //             }
    //         }

    //         // kiem tra title co sach chua
    //         const titlesBookExist = await Book.findOne({
    //             where: {
    //                 id_titles
    //             }
    //         })

    //         if (titlesBookExist) {
    //             return {
    //                 code: 400,
    //                 success: true,
    //                 message: 'The title of the book already has a book that cannot be deleted',
    //             }
    //         }

    //         await Titles.delete(id_titles)

    //         return {
    //             code: 200,
    //             success: true,
    //             message: 'Delete titles success',
    //         }
    //     } catch (error) {
    //         return {
    //             code: 500,
    //             success: false,
    //             message: 'Server error',
    //         }
    //     }
    // }

    // @Mutation(_return => MutationResponseTitle)
    // @UseMiddleware(checkAuth)
    // async updateTitles(
    //     @Arg('title') title: TitleInput
    // ): Promise<MutationResponseTitle> {
    //     try {
    //         const { name_title, id_titles, page, publishing_year, id_category, id_company, authors } = title

    //         const nameExist = await Titles.findOne({
    //             where: {
    //                 name_title
    //             }
    //         })


    //         if (nameExist) {
    //             return {
    //                 code: 400,
    //                 success: false,
    //                 message: 'Duplicated name title',
    //             }
    //         }

    //         const category = await Category.findOneBy({ id_category: id_category })
    //         const company = await Company.findOneBy({ id_company: id_company })
    //         let listAuthors: Authors[] = []
    //         for (let id_authors of authors) {
    //             const author = await Authors.findOneBy({ id_authors: id_authors as string })
    //             listAuthors.push(author as Authors)
    //         }

    //         const newTitle = {
    //             id_titles,
    //             name_title,
    //             page,
    //             publishing_year,
    //             company: company as Company,
    //             category: category as Category,
    //             authors: listAuthors,
    //         }
    //         const updateTitle = await Titles.save(newTitle as Titles)

    //         return {
    //             code: 200,
    //             success: true,
    //             message: 'Update title success',

    //             data: updateTitle
    //         }
    //     } catch (error) {
    //         return {
    //             code: 500,
    //             success: false,
    //             message: 'Server error',
    //         }
    //     }
    // }
}