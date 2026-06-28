import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';


@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
  ) {}

  async getHero() {
    const hero = await this.heroRepository.findOne({ where: { id: 1 } });
    if (!hero) {
      // Create default if none exists
      const newHero = this.heroRepository.create({
        title: 'Sumeya',
        subtitle: 'Computer Science Graduate',
        availability: 'Open to opportunities',
      });
      return this.heroRepository.save(newHero);
    }
    return hero;
  }

  async updateHero(heroData: Partial<Hero>) {
    const hero = await this.heroRepository.findOne({ where: { id: 1 } });
    if (!hero) {
      const newHero = this.heroRepository.create(heroData);
      return this.heroRepository.save(newHero);
    }
    Object.assign(hero, heroData);
    hero.updated_at = new Date();
    return this.heroRepository.save(hero);
  }
}