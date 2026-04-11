import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './users.interface';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

  async findUser(options: FindManyOptions<User>) {
    return this.repo.find(options);
  }

  async findAll() {
    return this.repo.find();
  }

  async setTokens(userId: string, at: string, rt: string) {
    return this.repo.update({ userId }, { at, rt });
  }

  async resetPassword(userId: string, hashedPassword: string) {
    return this.repo.update({ userId }, { password: hashedPassword });
  }

  async deleteUser(userId: string) {
    return this.repo.delete({ userId });
  }
}
