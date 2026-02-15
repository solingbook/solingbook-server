import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

export interface UserRepository {
  create(user: CreateUserDto): Promise<User>;
  findOneById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<DeleteResult>;
}
