import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Evaluation from './Evaluation';
import Appointment from './Appointment';

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

    @ManyToOne(() => Appointment, appointment => appointment.user)
    Appointments: Appointment[];
}

export default User;