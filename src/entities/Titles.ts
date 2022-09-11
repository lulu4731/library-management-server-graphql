import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Authors } from "./Authors";
import { Book } from "./Book";
import { Category } from "./Category";
import { Company } from "./Company";
import { ReceiptDetails } from "./ReceiptDetails";

@ObjectType()
@Entity()
export class Titles extends BaseEntity {
    @Field(_type => ID)
    @PrimaryColumn()
    id_titles!: string

    @Field()
    @Column("varchar", { length: 50 })
    name_title!: string


    @Field()
    @Column({ type: "integer", default: 0 })
    page!: number

    // @Field()
    // @Column({ type: "numeric", default: 0 })
    // price!: number

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    publishing_year!: Date

    @Field(() => Category, { nullable: true })
    @ManyToOne(() => Category, (category: Category) => category.titles)
    @JoinColumn({ name: 'id_category' })
    category: Category

    @Field(() => Company, { nullable: true })
    @ManyToOne(() => Company, (company: Company) => company.titles)
    @JoinColumn({ name: 'id_company' })
    company: Company

    @Field(() => [Authors], { nullable: true })
    @ManyToMany(() => Authors)
    @JoinTable({
        name: 'composed',
        joinColumn: {
            name: 'id_titles',
            referencedColumnName: 'id_titles'
        },
        inverseJoinColumn: {
            name: 'id_authors',
            referencedColumnName: 'id_authors'
        }
    })
    authors: Authors[]

    @Field(() => [ReceiptDetails], { nullable: true })
    @OneToMany(() => ReceiptDetails, (receiptDetail: ReceiptDetails) => receiptDetail.id_titles)
    receiptToTitle!: ReceiptDetails[];

    @Field(() => [Book], { nullable: true })
    @OneToMany(() => Book, (book: Book) => book.id_titles)
    books: Book[]
}