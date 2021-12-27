import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    username: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    password: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    email: string;

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