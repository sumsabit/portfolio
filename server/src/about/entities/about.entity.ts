import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('about')
export class About {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'text', array: true, nullable: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'jsonb', nullable: true })
  experience: any; // Store as JSON: [{ title, organization, period, description }]

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}