import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { CreateReviewDto } from './dto/createReview.dto';
import { TypeOrmReviewRepository } from './reviews.repository';
import { ReviewRepository } from './reviews.interface';
import { ReviewTargetType } from './constant/ReviewTargetType.enum';
import { TypeOrmBookRepository } from 'src/books/books.repository';
import { BookRepository } from 'src/books/books.interface';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(TypeOrmReviewRepository)
    private readonly reviewRepo: ReviewRepository,
    // @Inject(TypeOrmUserRepository)
    // private readonly userRepo: UserRepository,
    @Inject(TypeOrmBookRepository)
    private readonly bookRepo: BookRepository,
  ) {}

  /* 
  TODO
  - 인증/인가 작업 후 reviewerId 입력 로직 보완하기
  - Challenge 테이블 생성후 challengeId 검증하기
*/
  @Transactional()
  async create(createReviewDto: CreateReviewDto) {
    const { targetId, targetType } = createReviewDto;

    // if (targetType === ReviewTargetType.CHALLENGE) {
    // const challenge = await this.chellengeRepo.findOneById(targetId);
    // if (!challenge) throw new NotFoundException('Challenge not found');
    // }

    if (targetType === ReviewTargetType.BOOK) {
      const book = await this.bookRepo.findOneById(targetId);
      if (!book) throw new NotFoundException('Book not found');
    }

    return this.reviewRepo.create(createReviewDto);
  }

  async findOne(reviewId: string) {
    const review = await this.reviewRepo.findOneById(reviewId);

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  async findAll() {
    return this.reviewRepo.findAll();
  }

  async delete(reviewId: string) {
    await this.reviewRepo.delete(reviewId);
  }
}
