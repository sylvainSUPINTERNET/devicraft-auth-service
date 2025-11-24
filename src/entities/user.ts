import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // nom exact de la table
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
  password: string;
}
