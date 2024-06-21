import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import User from './User';
import Psych from './Psych';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, user => user.Appointments)
  user: User;

  @ManyToOne(() => Psych, psych => psych.Appointments)
  psych: Psych;
}

export default Appointment;