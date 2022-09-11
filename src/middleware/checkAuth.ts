import { Context } from "../types/Context";
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-core";
import { Secret, verify } from "jsonwebtoken";
import { LibrarianAuthPayload } from "../types/LibrarianAuthPayload";

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
    try {
        const authHeader = context.req.header('Authorization')
        const accessToken = authHeader && authHeader.split(' ')[1]

        if (!accessToken) {
            throw new AuthenticationError('Not authenticated to perform Graphql operations')
        }

        const decodeUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as LibrarianAuthPayload

        context.librarian = decodeUser
        return next()
    } catch (error) {
        throw new AuthenticationError(`Error authentication user, ${JSON.stringify(error)}`)
    }
};