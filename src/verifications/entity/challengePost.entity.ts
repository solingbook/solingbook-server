import { Progress } from 'src/challenges/entity/progress.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity('challenge_posts')
export class ChallengePost {
  @PrimaryGeneratedColumn('uuid', { name: 'post_id' })
  postId: string;

  @RelationId((challengePost: ChallengePost) => challengePost.writer)
  @Column({ name: 'writer_id', type: 'uuid' })
  writerId: string;

  @RelationId((challengePost: ChallengePost) => challengePost.progress)
  progressId: string;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'page_no', type: 'smallint' })
  pageNo: number;

  @Column({ name: 'post_image_url', type: 'varchar', length: 500 })
  postImageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.challengePosts, { nullable: false })
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @ManyToOne(() => Progress, (progress) => progress.challengePosts, {
    nullable: false,
  })
  @JoinColumn({ name: 'progress_id' })
  progress: Progress;
}
