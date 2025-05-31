import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User| null> {
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<User| null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }



  async findByUsernameOrEmail(usernameOrEmail: string) {
    return await  this.userModel.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updateData: any = { ...updateUserDto };
    
    if (updateUserDto.password) {
      updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      delete updateData.password;
    }

    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
}

  async remove(id: string): Promise<User| null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}