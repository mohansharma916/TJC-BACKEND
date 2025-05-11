import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

class CategoryTranslation {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;
}

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  parentCategoryId: Category;

  @Prop()
  featuredImage: string;

  @Prop({ type: [CategoryTranslation], required: true })
  translations: CategoryTranslation[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & Document;