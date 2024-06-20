import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text' })
    password: string;

    /*@Column('varchar', { length: 100, nullable: true })
    confirmPassword: string;*/
}

export default User;