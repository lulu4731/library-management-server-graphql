import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookBorrow } from "./BookBorrow";

@ObjectType()
@Entity()
export class Readers extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_readers!: string

    @Field()
    @Column()
    first_name!: string

    @Field()
    @Column()
    last_name!: string

    @Field()
    @Column({ type: "text" })
    address!: string

    @Field()
    @Column({ type: "smallint", default: 0 })
    gender!: number

    @Field()
    @Column("varchar", { length: 50 })
    email: string

    @Field()
    @Column("varchar", { length: 50 })
    citizen_identification: string

    @Field()
    @Column("varchar", { length: 15 })
    phone: string

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    date_of_birth!: Date

    @Field()
    @Column({ type: "smallint", default: 0 })
    readers_status!: number

    @Field(() => [BookBorrow], { nullable: true })
    @OneToMany(() => BookBorrow, (bookBorrow: BookBorrow) => bookBorrow.reader)
    bookBorrow: BookBorrow[]
}