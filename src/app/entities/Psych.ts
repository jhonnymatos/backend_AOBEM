import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Evaluation from './Evaluation';
import Appointment from './Appointment';

@Entity('psychs')
class Psych {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 100, nullable: false })
    email: string;

    @Column('varchar', { length: 100, nullable: false })
    password: string;

    @Column('varchar', { length: 100, nullable: false })
    phone: string;

    @Column('varchar', { length: 100, nullable: false })
    crp: string;

    @Column('varchar', { length: 100, nullable: false })
    estado: string;

    @OneToMany(() => Evaluation, evaluation => evaluation.psych)
    evaluations: Evaluation[];

    @ManyToOne(() => Appointment, appointment => appointment.psych)
    Appointments: Appointment[];
}

export default Psych;