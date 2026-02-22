import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.interface';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/createBook.dto';

@Injectable()
export class TypeOrmBookRepository implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const newBook = this.repo.create(createBookDto);

    return this.repo.save(newBook);
  }

  async findOneById(bookId: string): Promise<Book | null> {
    return this.repo.findOneBy({ bookId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(bookId: string) {
    return this.repo.delete({ bookId });
  }
}
