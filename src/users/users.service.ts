import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './users.interface';
import { TypeOrmUserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(TypeOrmUserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.userRepo.create(createUserDto);
    return null;
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(userId: string) {
    const user = await this.userRepo.findOneById(userId);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async delete(userId: string) {
    await this.userRepo.delete(userId);
  }
}
