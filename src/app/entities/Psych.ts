import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

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

    /*@Column('varchar', { length: 100, nullable: true })
    confirmPassword: string;*/

    @Column('varchar', { length: 100, nullable: false })
    phone: string;

    @Column('varchar', { length: 100, nullable: false })
    crp: string;

    @Column('varchar', { length: 100, nullable: false })
    estado: string;
}

export default Psych;