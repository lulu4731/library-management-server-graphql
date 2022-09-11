// import { RegisterInput } from "../types/RegisterInput";
// Arg, Ctx, Mutation, 
import { Context } from "../types/Context";
import { LibrarianMutationResponse } from "../types/LibrarianMutationResponse";
import { LoginInput } from "../types/LoginInput";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
// import { User } from "../entities/User";
import argon2 from 'argon2'
// import { UserMutationResponse } from "../types/UserMutationResponse";
// import { LoginInput } from "../types/LoginInput";
import { createToken } from "../utils/auth";
// import { Context } from "../types/Context";
import { Librarian } from "../entities/Librarian";

@Resolver()
export class LibrarianResolver {
    @Query(() => [Librarian])
    async librarian(): Promise<Librarian[]> {
        return await Librarian.find()
    }

    // @Mutation(_return => UserMutationResponse)
    // async register(
    //     @Arg('registerInput') registerInput: RegisterInput
    // ): Promise<UserMutationResponse> {
    //     const { username, password } = registerInput

    //     const existingUser = await User.findOne({
    //         where: {
    //             username: registerInput.username
    //         }
    //     })

    //     if (existingUser) {
    //         return {
    //             code: 400,
    //             success: false,
    //             message: "Duplicated username"
    //         }
    //     }

    //     const hashedPassword = await argon2.hash(password)

    //     const newUser = User.create({
    //         username,
    //         password: hashedPassword
    //     })

    //     await newUser.save()

    //     return {
    //         code: 200,
    //         success: true,
    //         message: 'User registration successful',

    //         user: newUser
    //     }
    // }

    @Mutation(_return => LibrarianMutationResponse)
    async login(
        @Arg('loginInput') { email, password }: LoginInput, @Ctx() { }: Context
    ): Promise<LibrarianMutationResponse> {
        const existingLibrarian = await Librarian.findOne({
            where: {
                email
            }
        })

        if (!existingLibrarian) {
            return {
                code: 400,
                success: false,
                message: 'Email not found'
            }
        }

        const isPasswordValid = await argon2.verify(existingLibrarian.password, password)

        if (!isPasswordValid) {
            return {
                code: 400,
                success: false,
                message: 'Incorrect Password'
            }
        }

        // res.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME as string, )
        return {
            code: 200,
            success: true,
            message: 'Login Successfully',

            librarian: existingLibrarian,
            accessToken: createToken(existingLibrarian)
        }
    }
}