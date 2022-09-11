import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Librarian } from "./Librarian";
import { ReceiptDetails } from "./ReceiptDetails";

@ObjectType()
@Entity()
export class Receipt extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_receipt!: string

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    create_time!: Date

    @Field(() => Librarian, { nullable: true })
    @ManyToOne(() => Librarian, (librarian: Librarian) => librarian.liquidations)
    @JoinColumn({ name: 'id_librarian' })
    librarian: Librarian

    // @Field(() => [Titles], { nullable: true })
    // @ManyToMany(() => Titles)
    // @JoinTable({ name: 'receipt_details' })
    // titles: Titles[]
    @Field(() => [ReceiptDetails], { nullable: true })
    @OneToMany(() => ReceiptDetails, (receiptDetail: ReceiptDetails) => receiptDetail.id_receipt)
    receiptToTitle!: ReceiptDetails[];
}