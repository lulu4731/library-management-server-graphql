import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Authors extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_authors!: string

    @Field()
    @Column()
    first_name!: string

    @Field()
    @Column()
    last_name!: string  

    @Field()
    @Column({ type: "smallint", default: 0 })
    gender!: number

    @Field()
    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    date_of_birth!: Date
}