import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { Liquidations } from "../entities/Liquidation";
import { Context } from "../types/Context";
import { MutationResponseLiquidations } from "../types/interface";
import { Librarian } from "../entities/Librarian";
import { Book } from "../entities/Book";

@Resolver()
export class LiquidationsResolver {
    @Query(() => [Liquidations])
    @UseMiddleware(checkAuth)
    async liquidations(): Promise<Liquidations[]> {
        return await Liquidations.find({
            relations: {
                librarian: true,
                books: {
                    id_titles: true
                }
            }
        })
    }

    @Mutation(_return => MutationResponseLiquidations)
    @UseMiddleware(checkAuth)
    async addLiquidations(
        @Ctx() { librarian }: Context,
        @Arg('books', _return => [String]) books: string[]
    ): Promise<MutationResponseLiquidations> {
        try {
            const lib = await Librarian.findOneBy({ id_librarian: librarian.userId })
            const newLiquidations = await Liquidations.create({
                librarian: lib as Librarian
            }).save()

            for (let item of books) {
                const book = await Book.findOneBy({ id_book: item })
                await Book.save({
                    ...book,
                    id_liquidation: newLiquidations
                })
            }

            return {
                code: 200,
                success: true,
                message: 'Add liquidations success',

                data: newLiquidations
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Server error',
            }
        }
    }
    @Mutation(_return => MutationResponseLiquidations)
    @UseMiddleware(checkAuth)
    async updateLiquidations(
        @Ctx() { librarian }: Context,
        @Arg('books', _return => [String]) books: string[],
        @Arg('id_liquidation') id_liquidation: string,
    ): Promise<MutationResponseLiquidations> {
        try {
            const lib = await Librarian.findOneBy({ id_librarian: librarian.userId })
            const liquidation = await Liquidations.findOneBy({ id_liquidation })

            const updateLiquidations = await Liquidations.save({
                ...liquidation,
                librarian: lib as Librarian
            })

            await Book.query(`update book set id_liquidation = null where id_liquidation = '${id_liquidation}'`)

            for (let item of books) {
                const book = await Book.findOneBy({ id_book: item })
                await Book.save({
                    ...book,
                    id_liquidation: updateLiquidations
                })
            }

            return {
                code: 200,
                success: true,
                message: 'Update liquidations success',

                data: updateLiquidations
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