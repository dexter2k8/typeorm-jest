import { hashSync } from "bcryptjs";
import {
    AfterInsert,
    AfterUpdate,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { Project } from "./project.entity";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid") id: string;

    @Column({ length: 50 }) name: string;
    @Column({ length: 50, unique: true }) email: string;
    @Column({ length: 120, select: false }) password: string;
    @Column({ default: false }) isAdm: boolean;
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
    @DeleteDateColumn({ select: false }) deletedAt: Date;

    //EAGER exibe todas as relações no método FIND
    @OneToOne(() => Address, (address) => address.user, { eager: true })
    address: Address;
    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) this.password = hashSync(this.password, 10);
    }

    @AfterInsert()
    @AfterUpdate()
    changeReturnedParameters() {
        // Transforma manualmente para UTC(-3:00), para retornar o horário correto
        this.createdAt = new Date(this.createdAt.getTime() - 3 * 60 * 60 * 1000);
        this.updatedAt = new Date(this.updatedAt.getTime() - 3 * 60 * 60 * 1000);
        // @ts-expect-error Aqui ocorre um erro de tipagem, mas estou ignorando
        delete this.password;
    }
}

export { User };
