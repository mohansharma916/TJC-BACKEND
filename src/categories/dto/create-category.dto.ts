import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class TranslationDto {
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;
}

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translations: TranslationDto[];

  @IsString()
  @IsOptional()
  parentCategoryId?: string  ;

  @IsString()
  featuredImage?: string;

  @IsNotEmpty()
  displayOrder: number;
}