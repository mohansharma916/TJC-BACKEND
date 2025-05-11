import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  fullName: string;

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  registrationDate: Date;

  @Prop()
  lastLogin: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  profilePicture: string;

  @Prop({ default: 'en' })
  preferredLanguage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;