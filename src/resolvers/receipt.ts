import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
// import { Titles } from "../entities/Titles";
// import { MutationResponseTitle, TitleInput } from "../types/interface";
// import { Category } from "../entities/Category";
// import { Company } from "../entities/Company";
// import { Authors } from "../entities/Authors";
// import { Book } from "../entities/Book";
import { Receipt } from "../entities/Receipt";
import { MutationResponseReceipt, ReceiptInput } from "../types/interface";
import { Context } from "../types/Context";
import { Librarian } from "../entities/Librarian";
import { ReceiptDetails } from "../entities/ReceiptDetails";
import { Book } from "../entities/Book";

@Resolver()
export class ReceiptResolver {
    @Query(() => [Receipt])
    @UseMiddleware(checkAuth)
    async receipts(): Promise<Receipt[]> {
        return await Receipt.find({
            relations: {
                librarian: true,
                receiptToTitle: {
                    id_titles: true
                }
            }
        })
    }

    @Mutation(_return => MutationResponseReceipt)
    @UseMiddleware(checkAuth)
    async addReceipt(
        @Ctx() { librarian }: Context,
        @Arg('receiptDetails') { receiptDetails }: ReceiptInput
    ): Promise<MutationResponseReceipt> {
        try {
            const lib = await Librarian.findOneBy({ id_librarian: librarian.userId })
            const newReceipt = await Receipt.create({
                librarian: lib as Librarian
            }).save()

            for (let item of receiptDetails) {
                await ReceiptDetails.create({
                    id_receipt: newReceipt.id_receipt,
                    id_titles: item.id_titles,
                    number_book: item.number_book,
                    price: item.price,
                }).save()

                for (let i = 0; i < item.number_book; i++) {
                    await Book.create({
                        id_titles: item.id_titles,
                        bookStatus: "50cd612b-eb93-4127-82e1-347d114cdcd5",
                        position: ''
                    }).save()
                }
            }
            return {
                code: 200,
                success: true,
                message: 'Add receipt success',

                data: newReceipt
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