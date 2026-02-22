import { DeleteResult } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/createBook.dto';

export interface BookRepository {
  create(createBookDto: CreateBookDto): Promise<Book>;
  findOneById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  delete(id: string): Promise<DeleteResult>;
}
