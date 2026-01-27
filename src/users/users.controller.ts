import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    console.log(typeof id);
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() create: CreateUserDto) {
    console.log(create);
    return this.usersService.create(create);
  }

  @Delete(':id')
  async remove(@Param() id: number) {
    return this.usersService.remove(id);
  }
}
