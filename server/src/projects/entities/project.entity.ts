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
  description: string;   // NOT NULL

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  liveUrl: string;

  @Column({ nullable: true })
  technologies: string;

  @Column('jsonb', { nullable: true })
  features: string[];

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn()
  createdAt: Date;
  @Column({ nullable: true })
demo: string;
@Column({ nullable: true })
reportLink: string;
  @UpdateDateColumn()
  updatedAt: Date;
}