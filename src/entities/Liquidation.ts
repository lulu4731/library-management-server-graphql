import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Librarian } from "./Librarian";

@ObjectType()
@Entity()
export class Liquidations extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_liquidation!: string

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    create_time!: Date

    @Field(() => Librarian, { nullable: true })
    @ManyToOne(() => Librarian, (librarian: Librarian) => librarian.liquidations)
    @JoinColumn({ name: 'librarian_id' })
    librarian: Librarian

    @Field(() => [Book], { nullable: true })
    @OneToMany(() => Book, (book: Book) => book.id_liquidation)
    books: Book[]
}