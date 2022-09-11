import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Titles } from "./Titles";

@ObjectType()
@Entity()
export class Company extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_company!: string

    @Field()
    @Column()
    name_company!: string

    @Field()
    @Column({ type: "text" })
    address!: string

    @Field()
    @Column("varchar", { length: 50 })
    email: string

    @Field()
    @Column("varchar", { length: 15 })
    phone: string

    @Field(() => Titles)
    @OneToMany(() => Titles, (titles: Titles) => titles.company)
    titles: Titles[]
}