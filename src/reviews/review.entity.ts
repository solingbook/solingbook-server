import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Check,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { ReviewTargetType } from './constant/ReviewTargetType.enum';
import { RATING_RANGE_CHECK } from './constant/constraints';

@Entity('reviews')
@Check(RATING_RANGE_CHECK)
export class Review {
  @PrimaryGeneratedColumn('uuid', { name: 'review_id' })
  reviewId: string;

  @Column({ name: 'reviewer_id', type: 'uuid' })
  reviewerId: string;

  @Column({ name: 'target_type', type: 'enum', enum: ReviewTargetType })
  targetType: ReviewTargetType;

  @Column({ name: 'target_id', type: 'uuid' })
  targetId: string;

  @Column({ name: 'rating', type: 'smallint' })
  rating: number;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;
}
