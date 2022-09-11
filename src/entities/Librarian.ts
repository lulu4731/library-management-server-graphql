import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookBorrow } from "./BookBorrow";
import { BorrowDetails } from "./BorrowDetails";
import { Liquidations } from "./Liquidation";
import { Receipt } from "./Receipt";

@ObjectType()
@Entity()
export class Librarian extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_librarian: string

    @Field()
    @Column()
    first_name!: string

    @Field()
    @Column()
    last_name!: string

    @Column({ type: "text" })
    address: string

    @Column({ type: "smallint", default: 0 })
    gender!: string

    @Column("varchar", { length: 50 })
    email: string

    @Column("varchar", { length: 15 })
    phone: string

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    date_of_birth: Date

    @Column({ type: "text" })
    password!: string

    @Field(() => [Liquidations], { nullable: true })
    @OneToMany(() => Liquidations, (liquidation: Liquidations) => liquidation.librarian)
    liquidations: Liquidations[]

    @Field(() => [Receipt], { nullable: true })
    @OneToMany(() => Receipt, (liquidation: Receipt) => liquidation.librarian)
    receipts: Liquidations[]

    @Field(() => [BookBorrow], { nullable: true })
    @OneToMany(() => BookBorrow, (bookBorrow: BookBorrow) => bookBorrow.librarian)
    bookBorrow: BookBorrow[]

    @Field(() => [BorrowDetails], { nullable: true })
    @OneToMany(() => BorrowDetails, (borrowDetails: BorrowDetails) => borrowDetails.librarian)
    borrowDetails: BorrowDetails[]
}