import { type } from "os";
import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";



@Entity("tasks")
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        nullable: false
    })
    userId: number
    
    @Column("varchar", { length: 255 , nullable: false})
    title: string;

    @Column("text", { nullable: false })
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.OPEN,
        nullable: false
    })
    status: TaskStatus;


    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @UpdateDateColumn({ type:"timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date;
}