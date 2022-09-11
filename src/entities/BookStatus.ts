import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@ObjectType()
@Entity()
export class BookStatus extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_status!: string

    @Field()
    @Column()
    name_status!: string

    @Field(() => [Book], { nullable: true })
    @OneToMany(() => Book, (book: Book) => book.bookStatus)
    books: Book[]
}