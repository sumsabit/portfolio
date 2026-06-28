import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './entities /about.entity';


@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  async getAbout(): Promise<About> {
    // Try to find the existing about entry (always id: 1)
    let about = await this.aboutRepository.findOne({ where: { id: 1 } });
    
    // If no about exists, create a default one
    if (!about) {
      const defaultAbout = this.aboutRepository.create({
        bio: 'I am a Computer Science graduate with hands-on experience in web penetration testing.',
        tags: ['Cybersecurity', 'Full-Stack', 'Python'],
        education: 'B.Sc. Computer Science, Jimma University (Graduated: 2026)',
        experience: [
          {
            title: 'Web Penetration Testing Intern',
            organization: 'INSA (Information Network Security Administration)',
            description: 'Vulnerability assessment, Linux, networking',
          },
          {
            title: 'Frontend Developer',
            organization: 'React, TypeScript, Tailwind CSS',
            description: 'Building responsive, interactive user interfaces',
          },
          {
            title: 'Backend Developer',
            organization: 'NestJS, REST APIs, PostgreSQL',
            description: 'Scalable server-side architecture and database design',
          },
        ],
      });
      about = await this.aboutRepository.save(defaultAbout);
    }
    
    return about;
  }

  async updateAbout(aboutData: Partial<About>): Promise<About> {
    let about = await this.aboutRepository.findOne({ where: { id: 1 } });
    
    if (!about) {
      // Create new if not exists
      const newAbout = this.aboutRepository.create(aboutData);
      return this.aboutRepository.save(newAbout);
    }
    
    // Update existing
    Object.assign(about, aboutData);
    return this.aboutRepository.save(about);
  }
}