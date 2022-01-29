import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('logs')
export class Log {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    context: string;

    @Column()
    message: string;

    @Column()
    level: string;

    @CreateDateColumn()
    created_at: Date;
}
