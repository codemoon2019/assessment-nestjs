import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { bcrypt } from 'bcrypt';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true, length:2048 })
    username: string

    @Column({ length:2048 })
    password: string    
    
    @Column({ length:2048 })
    firstName: string

    @Column({ length:2048 })
    lastName: string


}