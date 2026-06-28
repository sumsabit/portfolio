import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AboutService } from './about.service';
import { About } from './entities /about.entity';


@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  // GET /about - Public route
  @Get()
  getAbout(): Promise<About> {
    return this.aboutService.getAbout();
  }

  // PATCH /about - Protected route (Admin only)
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateAbout(@Body() aboutData: Partial<About>): Promise<About> {
    return this.aboutService.updateAbout(aboutData);
  }
}