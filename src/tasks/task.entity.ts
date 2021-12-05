import { timestamp } from "rxjs";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
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

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @UpdateDateColumn({ type:"timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date;
}