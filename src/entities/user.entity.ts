import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  provider: string;

  @Column()
  sub: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @Column()
  name: string;

  @Column()
  given_name: string;

  @Column()
  family_name: string;
  
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
