import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('hero')
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'Sumeya' })
  title: string;

  @Column({ type: 'text', default: 'Computer Science Graduate' })
  subtitle: string;

  @Column({ type: 'text', default: 'Open to opportunities' })
  availability: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}