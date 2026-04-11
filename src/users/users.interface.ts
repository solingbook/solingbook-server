import { DeleteResult, FindManyOptions, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

export interface UserRepository {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findUser(options: FindManyOptions<User>): Promise<User[]>;
  findAll(): Promise<User[]>;
  setTokens(userId: string, at: string, rt: string): Promise<UpdateResult>;
  resetPassword(userId: string, hashedPassword: string): Promise<UpdateResult>;
  deleteUser(id: string): Promise<DeleteResult>;
}
