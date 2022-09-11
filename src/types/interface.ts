import { Readers } from "../entities/readers";
import { Field, ObjectType, InputType } from "type-graphql";
import { IMutationResponse } from "./MutationRespone";
import { Librarian } from "../entities/Librarian";
import { Authors } from "../entities/Authors";
import { Category } from "../entities/Category";
import { Company } from "../entities/Company";
import { Titles } from "../entities/Titles";
import { Receipt } from "../entities/Receipt";

@ObjectType({ implements: IMutationResponse })
export class MutationResponse implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field(() => Authors || Readers || Librarian)
    data?: Readers | Authors | Librarian
}

@ObjectType({ implements: IMutationResponse })
export class MutationResponseCategory implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    data?: Category
}

@InputType()
export class ReaderInput {
    @Field()
    first_name?: string

    @Field()
    last_name?: string

    @Field()
    address?: string

    @Field()
    gender?: number

    @Field()
    email?: string

    @Field()
    citizen_identification?: string

    @Field()
    phone?: string

    @Field()
    date_of_birth?: string
}

@InputType()
export class AuthorInput {
    @Field()
    first_name?: string

    @Field()
    last_name?: string

    @Field()
    gender?: number

    @Field()
    date_of_birth?: string
}

//Company
@ObjectType({ implements: IMutationResponse })
export class MutationResponseCompany implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    data?: Company
}

@InputType()
export class CompanyInput {
    @Field()
    name_company?: string

    @Field()
    address?: string

    @Field()
    email?: string

    @Field()
    phone?: string
}

//Titles
@ObjectType({ implements: IMutationResponse })
export class MutationResponseTitle implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    data?: Titles
}

@InputType()
export class TitleInput {
    @Field()
    id_titles!: string

    @Field()
    name_title!: string

    @Field()
    page!: number

    // @Field()
    // price!: number

    @Field()
    publishing_year!: Date

    @Field()
    id_category: string

    @Field()
    id_company: string

    @Field(() => [String])
    authors: String[]
}

//Liquidation
@ObjectType({ implements: IMutationResponse })
export class MutationResponseLiquidation implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    data?: Titles
}

@InputType()
export class LiquidationInput {
    @Field()
    id_librarian!: string
}

//receipt
@ObjectType({ implements: IMutationResponse })
export class MutationResponseReceipt implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    data?: Receipt
}

@InputType()
export class IReceiptDetail {
    @Field()
    id_titles: string
    
    @Field()
    number_book: number

    @Field()
    price: number
}

@InputType()
export class ReceiptInput {
    @Field(() => [IReceiptDetail])
    receiptDetails: IReceiptDetail[]
}