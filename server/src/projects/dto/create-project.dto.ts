import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  

  @IsOptional()
  @IsUrl()
  github?: string;

  @IsOptional()
  @IsUrl()
  demo?: string;

  @IsOptional()
  @IsString()
  technologies?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}