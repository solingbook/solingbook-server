import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User as UserEntity } from './user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id', new ParseUUIDPipe()) userId: string,
  // ): Promise<User> {
  //   return this.usersService.findUser(userId);
  // }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
