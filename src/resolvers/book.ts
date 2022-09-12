import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { Book } from "../entities/Book";
import { MutationResponseBooks } from "../types/interface";

@Resolver()
export class BooksResolver {
    @Query(() => [Book])
    @UseMiddleware(checkAuth)
    async books(): Promise<Book[]> {
        return await Book.find({
            relations: {
                bookStatus: true,
                id_titles: true
            }
        })
    }

    @Mutation(_return => MutationResponseBooks)
    @UseMiddleware(checkAuth)
    async updateBook(
        @Arg('position') position: string,
        @Arg('id_book') id_book: string
    ): Promise<MutationResponseBooks> {
        try {
            const bookExist = await Book.findOneBy({
                id_book,
            })

            if (!bookExist) {
                return {
                    code: 400,
                    success: false,
                    message: 'No book found',
                }
            }

            const updateBook = await Book.save({ ...bookExist, position: position })

            return {
                code: 200,
                success: true,
                message: 'Update book success',

                data: updateBook
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