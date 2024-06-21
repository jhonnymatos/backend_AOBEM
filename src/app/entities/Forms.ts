import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class Forms {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  fullName: string;
 
  @Column()
  email: string;
 
  @Column()
  state: string;
 
  @Column()
  crp: string;
 
  @Column()
  specialty: string;
 
  @Column({ nullable: true })
  specialty2: string | null;
 
  @Column()
  formation: string;
 
  @Column()
  formationArea: string;
 
  @Column()
  service: string;
 
  @Column({ nullable: true })
  service2: string | null;
 
  @Column()
  shortBio: string;
 
  @Column()
  fullBio: string;
}