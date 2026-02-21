import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmBookRepository } from './books.repository';
import { BookRepository } from './books.interface';
import { CreateBookDto } from './dto/createBook.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject(TypeOrmBookRepository)
    private readonly bookRepo: BookRepository,
  ) {}

  async create(createReviewDto: CreateBookDto) {
    // TODO: ISBN 조회 API 연동하기

    return this.bookRepo.create(createReviewDto);
  }

  async findOne(bookId: string) {
    const book = await this.bookRepo.findOneById(bookId);

    if (!book) throw new NotFoundException('Book not found');

    return book;
  }

  async findAll() {
    return this.bookRepo.findAll();
  }

  async delete(bookId: string) {
    await this.bookRepo.delete(bookId);
  }
}
