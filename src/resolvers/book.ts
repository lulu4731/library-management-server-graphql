import { Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { Book } from "../entities/Book";

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
}