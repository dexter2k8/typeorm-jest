import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Technology } from './technology.entity';
import { User } from './user.entity';

@Entity('projects')
class Project {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 50 }) name: string;
    @Column({ length: 360 }) description: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user: User;

    @ManyToMany(() => Technology)
    @JoinTable()
    technologies: Technology[];
}

export { Project };
