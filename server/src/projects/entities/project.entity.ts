import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;  

  @Column({ nullable: true })
  github: string;


  @Column({ nullable: true })
  technologies: string;

  @Column('jsonb', { nullable: true })
  features: string[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  demo: string;

  @Column({ nullable: true })
  reportLink: string;

  @UpdateDateColumn()
  updatedAt: Date;
}