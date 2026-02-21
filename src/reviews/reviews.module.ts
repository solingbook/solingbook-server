import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { TypeOrmReviewRepository } from './reviews.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  exports: [TypeOrmModule, TypeOrmReviewRepository],
  providers: [ReviewsService, TypeOrmReviewRepository],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
