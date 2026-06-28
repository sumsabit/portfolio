import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get()
  getHero() {
    return this.heroService.getHero();
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateHero(@Body() heroData: any) {
    return this.heroService.updateHero(heroData);
  }
}