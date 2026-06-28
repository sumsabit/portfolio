import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skills.entity';


@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  // Get all skills (public)
  findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  // Get one skill by ID (public)
  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  // Create a new skill (admin)
  create(skillData: Partial<Skill>): Promise<Skill> {
    const skill = this.skillRepository.create(skillData);
    return this.skillRepository.save(skill);
  }

  // Update an existing skill (admin)
  async update(id: number, skillData: Partial<Skill>): Promise<Skill> {
    const skill = await this.findOne(id); // throws if not found
    Object.assign(skill, skillData);
    return this.skillRepository.save(skill);
  }

  // Delete a skill (admin)
  async remove(id: number): Promise<void> {
    const result = await this.skillRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
  }
}
