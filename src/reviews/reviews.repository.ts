import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './reviews.interface';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/createReview.dto';

@Injectable()
export class TypeOrmReviewRepository implements ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repo: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const newReview = this.repo.create(createReviewDto);

    return this.repo.save(newReview);
  }

  async findOneById(reviewId: string): Promise<Review | null> {
    return this.repo.findOneBy({ reviewId });
  }

  async findAll() {
    return this.repo.find();
  }

  delete(reviewId: string) {
    return this.repo.delete({ reviewId });
  }
}
