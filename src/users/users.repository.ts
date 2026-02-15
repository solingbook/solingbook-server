import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async create(user: CreateUserDto) {
    const newUser = this.repo.create(user);

    return this.repo.save(newUser);
  }

  async findOneById(userId: string): Promise<User | null> {
    return this.repo.findOneBy({ userId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(userId: string) {
    return this.repo.delete({ userId });
  }
}
