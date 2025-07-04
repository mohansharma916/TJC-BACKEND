import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
 async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get("latest")
async findAlllatest(
  @Query('limit') limit: number,
  @Query('status') status: string,
  @Query('sort') sort: string,
) {
  return await this.articlesService.findAllLatestArticle({ limit, status, sort });
}

  @Get(':id')
  findOne(@Param('id') id: string) {
   
    return this.articlesService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(
    @Param('slug') slug: string,
    @Query('language') language: string = 'en',
  ) {
    return this.articlesService.findBySlug(slug, language);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @Patch(':id/view')
  incrementViewCount(@Param('id') id: string) {
    return this.articlesService.incrementViewCount(id);
  }

  @Get('featured/:language')
  findFeatured(@Param('language') language: string) {
    return this.articlesService.findFeatured(language);
  }




  @Get('breaking/:language')
  findBreakingNews(@Param('language') language: string) {
    return this.articlesService.findBreakingNews(language);
  }

  @Get('category/:categoryId/:language')
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Param('language') language: string,
  ) {
    return this.articlesService.findByCategory(categoryId, language);
  }
}