// src/projects/projects.controller.ts 
// ✅ 100% IDENTICAL to the Prisma version. No changes needed!

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  // Notice: we still inject the same ProjectsService.
  // The SERVICE handles the TypeORM logic, the CONTROLLER just calls it.
  constructor(private readonly projectsService: ProjectsService) {}
 
  @UseGuards(AuthGuard('jwt')) 
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    // Still calls the service. The service now uses TypeORM behind the scenes.
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // The service expects a number, we convert it here (just like before).
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}