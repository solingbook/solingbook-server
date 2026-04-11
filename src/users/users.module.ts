import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeletedUser } from './deleted_user.entity';
import { TypeOrmUserRepository } from './users.repository';

// TODO: repo를 import하지 말고 service를 import하는 구조로 통일하기
@Module({
  imports: [TypeOrmModule.forFeature([User, DeletedUser])],
  exports: [TypeOrmModule, TypeOrmUserRepository, UsersService],
  providers: [UsersService, TypeOrmUserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
