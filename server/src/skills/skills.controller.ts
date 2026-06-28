import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skills.entity';


@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  // GET /skills – Public
  @Get()
  findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  // GET /skills/:id – Public
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.findOne(+id);
  }

  // POST /skills – Protected (Admin only)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() skillData: Partial<Skill>): Promise<Skill> {
    return this.skillsService.create(skillData);
  }

  // PATCH /skills/:id – Protected (Admin only)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() skillData: Partial<Skill>): Promise<Skill> {
    return this.skillsService.update(+id, skillData);
  }

  // DELETE /skills/:id – Protected (Admin only)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string): Promise<void> {
    return this.skillsService.remove(+id);
  }
}