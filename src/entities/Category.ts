import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Titles } from "./Titles";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id_category!: string

    @Field()
    @Column("varchar", { length: 50 })
    name_category: string

    @Field(() => [Titles], { nullable: true })
    @OneToMany(() => Titles, (titles: Titles) => titles.category)
    titles: Titles[]
}