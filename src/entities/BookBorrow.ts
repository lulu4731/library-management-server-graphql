import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BorrowDetails } from "./BorrowDetails";
import { Librarian } from "./Librarian";
import { Readers } from "./readers";

@ObjectType()
@Entity()
export class BookBorrow extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_borrow!: string

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    create_time!: Date


    @Field(() => Readers, { nullable: true })
    @ManyToOne(() => Readers, (reader: Readers) => reader.bookBorrow, { eager: true })
    @JoinColumn({ name: 'id_reader' })
    reader: Readers

    @Field(() => Librarian, { nullable: true })
    @ManyToOne(() => Librarian, (librarian: Librarian) => librarian.bookBorrow, { eager: true })
    @JoinColumn({ name: 'id_librarian' })
    librarian: Librarian

    @Field(() => [BorrowDetails], { nullable: true })
    @OneToMany(() => BorrowDetails, (borrowDetails: BorrowDetails) => borrowDetails.bookBorrow)
    borrowToBook!: BorrowDetails[];
}