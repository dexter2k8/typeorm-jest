import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
class Address {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column() street: string;
    @Column({ length: 2 }) state: string;
    @Column({ length: 8, nullable: true }) zipCode: string;

    //cascade salva tabela address junto com user
    @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    user: User;
}

export { Address };
