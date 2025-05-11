import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('parentCategoryId').exec();
  }

  async findOne(id: string): Promise<Category | null> {
    return  this.categoryModel.findById(id).populate('parentCategoryId').exec();
  }

  async findBySlug(slug: string): Promise<Category| null> {
    return this.categoryModel.findOne({ slug }).populate('parentCategoryId').exec();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .populate('parentCategoryId')
      .exec();
  }

  async remove(id: string): Promise<Category | null> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async findSubcategories(parentId: string): Promise<Category[]> {
    return this.categoryModel
      .find({ parentCategoryId: parentId })
      .populate('parentCategoryId')
      .exec();
  }
}