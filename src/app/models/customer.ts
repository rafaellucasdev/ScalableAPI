import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customers')
class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;
}

export default Customer;