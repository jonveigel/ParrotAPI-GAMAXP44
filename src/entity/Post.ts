import { Length } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    idpost: number

    @Column("varchar", { length: 500} )
    @Length(2, 500)
    content: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, user => user.post)

    @JoinColumn({ name: 'user_iduser'})
    user: User
}