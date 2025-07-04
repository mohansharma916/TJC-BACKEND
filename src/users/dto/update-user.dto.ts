import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  preferredLanguage?: string;
}