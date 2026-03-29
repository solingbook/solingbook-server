import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './users.interface';
import { TypeOrmUserRepository } from './users.repository';
import { FindManyOptions } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(TypeOrmUserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    this.userRepo.createUser(createUserDto);
    return null;
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findUser(options: FindManyOptions<User>) {
    return this.userRepo.findUser(options);
  }

  async findOneById(userId: string) {
    const [user] = await this.userRepo.findUser({ where: { userId } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findUser({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async setTokens(userId: string, at: string, rt: string) {
    await this.userRepo.setTokens(userId, at, rt);
  }

  async deleteUser(userId: string) {
    await this.userRepo.deleteUser(userId);
  }
}
