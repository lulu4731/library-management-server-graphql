import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Book } from "./Book";
import { BookBorrow } from "./BookBorrow";
import { Librarian } from "./Librarian";

@ObjectType()
@Entity('borrow_details')
export class BorrowDetails extends BaseEntity {
    // @Field()
    // @PrimaryColumn("uuid")
    // id_borrow: string

    // @Field()
    // @PrimaryColumn("uuid")
    // id_book: string

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    expired!: Date

    @Field()
    @Column({ type: "smallint", default: 0 })
    borrow_status!: number

    @Field()
    @Column({ type: "smallint", default: 0 })
    number_renewal!: number

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    date_return_book!: Date

    @Field(() => Librarian, { nullable: true })
    @ManyToOne(() => Librarian, (librarian: Librarian) => librarian.borrowDetails)
    @JoinColumn({ name: 'id_librarian' })
    librarian: Librarian

    @Field(() => Book, { nullable: true })
    @PrimaryColumn("uuid")
    @JoinColumn({ name: 'books' })
    @ManyToOne(() => Book, (books: Book) => books.borrowToBook)
    books!: Book

    @Field(() => BookBorrow, { nullable: true })
    @PrimaryColumn("uuid")
    @JoinColumn({ name: 'bookBorrow' })
    @ManyToOne(() => BookBorrow, (book_borrow: BookBorrow) => book_borrow.borrowToBook)
    bookBorrow!: BookBorrow
}