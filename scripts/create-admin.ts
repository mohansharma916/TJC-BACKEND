import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import * as bcrypt from 'bcrypt';

async function createAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);

  const adminData = {
    username: 'admin',
    email: 'mohansharma916@gmail.com',
    password: await bcrypt.hash('Garvit@1310', 10),
    fullName: 'System Administrator',
    role: 'admin',
    isActive: true,
    isVerified: true,
  };

  try {
    const existingAdmin = await userService.findByUsername('admin');
    if (existingAdmin) {
      console.log('Admin user already exists');
      await app.close();
      return;
    }

    const admin = await userService.create(adminData);
    console.log('Admin user created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await app.close();
  }
}

createAdminUser();