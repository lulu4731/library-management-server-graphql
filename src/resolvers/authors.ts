import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../middleware/checkAuth";
import { Authors } from "../entities/Authors";
import { AuthorInput, MutationResponse } from "../types/interface";

@Resolver()
export class AuthorsResolver {
    @Query(() => [Authors])
    @UseMiddleware(checkAuth)
    async authors(): Promise<Authors[]> {
        return await Authors.find()
    }

    @Mutation(_return => MutationResponse)
    @UseMiddleware(checkAuth)
    async addAuthors(
        @Arg('author') author: AuthorInput
    ): Promise<MutationResponse> {

        const newAuthor = Authors.create(author)
        await newAuthor.save()

        return {
            code: 200,
            success: true,
            message: 'Add author success',

            data: newAuthor as Authors
        }
    }

    @Mutation(_return => MutationResponse)
    @UseMiddleware(checkAuth)
    async deleteAuthors(
        @Arg('id_authors') id_authors: string
    ): Promise<MutationResponse> {
        const authorExist = await Authors.findOne({
            where: {
                id_authors
            }
        })

        if (!authorExist) {
            return {
                code: 400,
                success: false,
                message: 'No author found',
            }
        }

        await Authors.delete(id_authors)

        return {
            code: 200,
            success: true,
            message: 'Delete authors success',
        }
    }

    @Mutation(_return => MutationResponse)
    @UseMiddleware(checkAuth)
    async updateAuthors(
        @Arg('author') author: AuthorInput,
        @Arg('id_authors') id_authors: string
    ): Promise<MutationResponse> {

        const authorExist = await Authors.findOne({
            where: {
                id_authors
            }
        })

        if (!authorExist) {
            return {
                code: 400,
                success: false,
                message: 'No author found',
            }
        }

        const updateAuthor = await Authors.save({ ...author, id_authors })

        return {
            code: 200,
            success: true,
            message: 'Add author success',

            data: updateAuthor
        }
    }
}