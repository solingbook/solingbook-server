import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './users.interface';
import { TypeOrmUserRepository } from './users.repository';
import { DataSource, FindManyOptions } from 'typeorm';
import { User } from './user.entity';
import { DeletedUser } from './deleted_user.entity';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';

@Injectable()
export class UsersService {
  constructor(
    @Inject(TypeOrmUserRepository)
    private readonly userRepo: UserRepository,
    @InjectDataSource()
    private readonly dataSource: DataSource,
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

    if (!user) throw new ENotFoundException({
            message: '존재하지 않는 사용자 정보입니다.',
            errorCode: ERROR_CODE.USER_NOT_FOUND,
          });

    return user;
  }

  async findOneByEmail(email: string) {
    const users = await this.userRepo.findUser({ where: { email } });
    const [user] = users;

    if (!user) throw new ENotFoundException({
            message: '존재하지 않는 사용자 정보입니다.',
            errorCode: ERROR_CODE.USER_NOT_FOUND,
          });

    return user;
  }

  async setTokens(userId: string, at: string, rt: string) {
    await this.userRepo.setTokens(userId, at, rt);
  }

  async resetPassword(userId: string, hashedPassword: string) {
    return this.userRepo.resetPassword(userId, hashedPassword);
  }

  async archiveDeletedUser(user: User, deletionReason: string) {
    await this.dataSource.transaction(async (manager) => {
      await manager.insert(DeletedUser, {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        createdAt: user.createdAt,
        deletionReason,
      });
      await manager.delete(User, { userId: user.userId });
    });
  }

  async deleteUser(userId: string) {
    await this.userRepo.deleteUser(userId);
  }
}
