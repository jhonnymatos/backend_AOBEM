import { Entity, Column } from 'typeorm';

@Entity()
    class Appointments {
    
    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column('varchar', { length: 100, nullable: false })
    phone: string;

    @Column({ type: 'text' })
    reason: string;
}

export default Appointments;