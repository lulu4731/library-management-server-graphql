import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Receipt } from "./Receipt";
import { Titles } from "./Titles";

@ObjectType()
@Entity('receipt_details')
export class ReceiptDetails extends BaseEntity {
    @Field()
    @Column({ type: "int" })
    number_book: number;

    @Field()
    @Column({ type: "numeric", default: 0 })
    price!: number

    @Field(() => Receipt)
    @PrimaryColumn("uuid")
    @JoinColumn({ name: 'id_receipt' })
    @ManyToOne(() => Receipt, (receipt: Receipt) => receipt.receiptToTitle)
    id_receipt!: string

    @Field(() => Titles)
    @PrimaryColumn()
    @JoinColumn({ name: 'id_titles' })
    @ManyToOne(() => Titles, (title: Titles) => title.receiptToTitle)
    id_titles!: string
}