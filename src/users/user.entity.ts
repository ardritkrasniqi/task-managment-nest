/*
 * @Author: Ardrit Krasniqi © 
 * @Date: 2022-01-03 15:39:33 
 * @Last Modified by: Ardrit Krasniqi ©
 * @Last Modified time: 2022-01-04 17:08:36
 */

import { Exclude } from "class-transformer";
import { Task } from "src/tasks/task.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    email: string;

    
    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    password: string;

   
    @Column({
        type: "varchar",
        nullable: false,
        length: 100
    })
    first_name: string;

    @Column({
        type: "varchar",
        nullable: false,
        length:100
    })
    last_name: string;

    @Column({
        type: "int",
        nullable: false,
        width: 1,
        default: 0
    })
    is_active: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    salt: string;


    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

    @CreateDateColumn({
        type: "timestamp with time zone",
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;

    @UpdateDateColumn({ 
        type:"timestamp with time zone", 
        default: () => "CURRENT_TIMESTAMP", 
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updated_at: Date;
}