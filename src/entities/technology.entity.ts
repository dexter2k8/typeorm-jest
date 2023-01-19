import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('technologies')
class Technology {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 20, unique: true }) name: string;

    @ManyToMany(() => Project)
    projects: Project[];
}

export { Technology };
