import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(usernameOrEmail) || 
                 await this.usersService.findByEmail(usernameOrEmail);
    
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      const { passwordHash, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async validateSignup(createUserDto: CreateUserDto): Promise<void> {
    // Check if username already exists
    const usernameExists = await this.usersService.findByUsername(createUserDto.username);
    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const emailExists = await this.usersService.findByEmail(createUserDto.email);
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Additional business logic validations can go here
    if (createUserDto.username === createUserDto.password) {
      throw new BadRequestException('Username and password cannot be the same');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload,{secret:";H_@]pVb_vR&c,s%/E+t!gl>ku6Sui"}),
      user,
    };
  }


  async signup(createUserDto: CreateUserDto): Promise<any> {
    await this.validateSignup(createUserDto);
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // Create a new object with the user data, replacing password with passwordHash
    const userData = {
      username: createUserDto.username,
      email: createUserDto.email,
      fullName: createUserDto.fullName,
      phone: createUserDto.phone,
      password: hashedPassword // Using passwordHash instead of password
    };
  
    const user = await this.usersService.create(userData);
    const { passwordHash, ...result } = user.toObject();
    return this.login(result);
  }

  async getProfile(userId: string): Promise<User | null> {
    return this.usersService.findOne(userId);
  }
}