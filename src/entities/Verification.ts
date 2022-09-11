import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Verification extends BaseEntity {
    @Field(_type => ID)
    @PrimaryColumn()
    id_librarian!: string

    @Field()
    @Column({ type: 'text' })
    code!: string

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    create_time!: Date
}