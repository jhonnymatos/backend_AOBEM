import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Evaluation from './Evaluation';

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

    @OneToMany(() => Evaluation, evaluation => evaluation.user)
   evaluations: Evaluation[];

   @OneToMany(() => Evaluation, evaluation => evaluation.user)
    evaluation: Evaluation[];
}

export default User;