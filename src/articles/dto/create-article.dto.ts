import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ArticleTranslationDto {
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()
  status?: 'draft' | 'published' | 'archived';

  @IsOptional()
  isFeatured?: boolean;

  @IsOptional()
  isBreaking?: boolean;

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  publishedAt?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticleTranslationDto)
  translations: ArticleTranslationDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedArticles?: string[];
}