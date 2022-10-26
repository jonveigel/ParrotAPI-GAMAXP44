import { IsNotEmpty, Length } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from "typeorm"
import bcrypt from "bcryptjs";
import { Post } from "./Post";


@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    iduser: number

    @Column()
    @Length(4, 70)
    name: string

    @Column({ unique: true })
    @Length(4, 70)
    email: string

    @Column()
    @Length(5, 120)
    password: string

    @Column()
    @Length(0, 255)
    userphoto: string

    @Column()
    @IsNotEmpty()
    role: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Post, post => post.user)
    post: Post[]

    passwordHash() {
        this.password = bcrypt.hashSync(this.password, 10)
    }

    UnencryptedPassword(UnencryptedPassword: string) {
        return bcrypt.compareSync(UnencryptedPassword, this.password)
    }
}
