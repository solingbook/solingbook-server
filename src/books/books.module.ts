import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmBookRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  exports: [TypeOrmModule, TypeOrmBookRepository],
  providers: [BooksService, TypeOrmBookRepository],
  controllers: [BooksController],
})
export class BooksModule {}
