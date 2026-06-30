import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';
import { HeroModule } from './hero/hero.module';
import { AboutModule } from './about/about.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
    ProjectsModule,
    MessagesModule,
    SkillsModule,
    AuthModule,
    HeroModule,
    AboutModule, // ✅ only this is needed
  ],
  // ❌ Remove controllers and providers – they are inside AboutModule
  // controllers: [AboutController],
  // providers: [AboutService],
})
export class AppModule {}