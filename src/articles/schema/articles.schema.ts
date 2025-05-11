import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../../categories/schema/category.schema';

class ArticleTranslation {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop([String])
  tags: string[];
}

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  slug: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }])
  categoryIds: Category[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  authorId: string;

  @Prop({
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  })
  status: string;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isBreaking: boolean;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop()
  featuredImage: string;

  @Prop()
  videoUrl: string;

  @Prop()
  publishedAt: Date;

  @Prop({ type: [ArticleTranslation], required: true })
  translations: ArticleTranslation[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Article' }])
  relatedArticles: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
// In article.schema.ts
export type ArticleDocument = Article & Document;