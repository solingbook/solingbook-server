import { DeleteResult } from 'typeorm';
import { CreateReviewDto } from './dto/createReview.dto';
import { Review } from './review.entity';

export interface ReviewRepository {
  create(createReviewDto: CreateReviewDto): Promise<Review>;
  findOneById(id: string): Promise<Review | null>;
  findAll(): Promise<Review[]>;
  delete(id: string): Promise<DeleteResult>;
}
