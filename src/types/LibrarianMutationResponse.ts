import { Field, ObjectType } from "type-graphql";
import { Librarian } from "../entities/Librarian";
import { IMutationResponse } from "./MutationRespone";

@ObjectType({ implements: IMutationResponse })
export class LibrarianMutationResponse implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    librarian?: Librarian

    @Field({ nullable: true })
    accessToken?: string
}