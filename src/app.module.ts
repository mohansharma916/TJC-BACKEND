import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';
import { MediaModule } from './media/media.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { LanguagesModule } from './languages/languages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './articles/schema/articles.schema';
import { Category, CategorySchema } from './categories/schema/category.schema';
import { User, UserSchema } from './users/schema/user.schema';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
       
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),



    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: "jwtConstants.secret",
      signOptions: { expiresIn: '60m' },
    }),
    DatabaseModule,
    UsersModule,
    CategoriesModule,
    ArticlesModule,
    MediaModule,
    AdvertisementsModule,
    LanguagesModule,
    AuthModule,
  ],
})
export class AppModule {}