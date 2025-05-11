import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schema/articles.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel({
      ...createArticleDto,
      publishedAt: createArticleDto.status === 'published' ? new Date() : null,
    });
    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel
      .find()
      .populate('categoryIds')
      .populate('authorId')
      .exec();
  }

  async findOne(id: string): Promise<Article | null> {
    return this.articleModel
      .findById(id)
      .populate('categoryIds')
      .populate('authorId')
      .populate('relatedArticles')
      .exec();
  }

  async findBySlug(slug: string, language: string): Promise<Article | null> {
    return this.articleModel
      .findOne({ 
        slug,
        'translations.language': language 
      })
      .populate('categoryIds')
      .populate('authorId')
      .populate('relatedArticles')
      .exec();
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article| null> {
    if (updateArticleDto.status === 'published' && !updateArticleDto.publishedAt) {
      updateArticleDto.publishedAt = new Date();
    }
    return this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .populate('categoryIds')
      .populate('authorId')
      .populate('relatedArticles')
      .exec();
  }

  async remove(id: string): Promise<Article | null> {
    return this.articleModel.findByIdAndDelete(id).exec();
  }

  async incrementViewCount(id: string): Promise<Article | null> {
    return this.articleModel
      .findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true })
      .exec();
  }

  async findFeatured(language: string): Promise<Article[]> {
    return this.articleModel
      .find({ 
        isFeatured: true,
        status: 'published',
        'translations.language': language 
      })
      .sort({ publishedAt: -1 })
      .limit(5)
      .populate('categoryIds')
      .populate('authorId')
      .exec();
  }

  async findBreakingNews(language: string): Promise<Article[]> {
    return this.articleModel
      .find({ 
        isBreaking: true,
        status: 'published',
        'translations.language': language 
      })
      .sort({ publishedAt: -1 })
      .limit(5)
      .populate('categoryIds')
      .populate('authorId')
      .exec();
  }

  async findByCategory(
    categoryId: string,
    language: string,
  ): Promise<Article[]> {
    return this.articleModel
      .find({ 
        categoryIds: categoryId,
        status: 'published',
        'translations.language': language 
      })
      .sort({ publishedAt: -1 })
      .populate('categoryIds')
      .populate('authorId')
      .exec();
  }
}