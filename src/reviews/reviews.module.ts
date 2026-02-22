import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { TypeOrmReviewRepository } from './reviews.repository';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), BooksModule],
  exports: [TypeOrmModule, TypeOrmReviewRepository],
  providers: [ReviewsService, TypeOrmReviewRepository],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
