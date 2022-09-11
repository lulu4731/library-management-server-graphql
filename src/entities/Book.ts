import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookStatus } from "./BookStatus";
import { BorrowDetails } from "./BorrowDetails";
import { Liquidations } from "./Liquidation";
import { Titles } from "./Titles";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_book!: string

    @Field()
    @Column({ type: 'text', nullable: true })
    position: string

    @Field(() => Liquidations, { nullable: true })
    @ManyToOne(() => Liquidations, (liquidation: Liquidations) => liquidation.books)
    @JoinColumn({ name: 'id_liquidation' })
    id_liquidation: Liquidations

    @Field(() => Titles, { nullable: true })
    @ManyToOne(() => Titles, (title: Titles) => title.books)
    @JoinColumn({ name: 'id_titles' })
    id_titles: string

    @Field(() => BookStatus, { nullable: true })
    @ManyToOne(() => BookStatus, (bookStatus: BookStatus) => bookStatus.books)
    @JoinColumn({ name: 'id_status' })
    bookStatus: string

    @Field(() => [BorrowDetails], { nullable: true })
    @OneToMany(() => BorrowDetails, (borrowDetails: BorrowDetails) => borrowDetails.books)
    borrowToBook!: BorrowDetails[];
}