import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmBookRepository } from './books.repository';
import { BookRepository } from './books.interface';
import { CreateBookDto } from './dto/createBook.dto';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';

@Injectable()
export class BooksService {
  constructor(
    @Inject(TypeOrmBookRepository)
    private readonly bookRepo: BookRepository,
  ) {}

  async create(createBookDto: CreateBookDto) {
    // TODO: ISBN 조회 API 연동하기

    return this.bookRepo.create(createBookDto);
  }

  async findOne(bookId: string) {
    const book = await this.bookRepo.findOneById(bookId);

    if (!book) throw new ENotFoundException({
            message: '존재하지 않는 도서 정보입니다.',
            errorCode: ERROR_CODE.BOOK_NOT_FOUND,
          });;

    return book;
  }

  async findAll() {
    return this.bookRepo.findAll();
  }

  async delete(bookId: string) {
    await this.bookRepo.delete(bookId);
  }
}
