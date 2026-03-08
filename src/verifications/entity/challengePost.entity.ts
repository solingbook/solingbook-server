import { Progress } from 'src/challenges/entity/progress.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('challenge_posts')
export class ChallengePost {
  @PrimaryGeneratedColumn('uuid', { name: 'challenge_post_id' })
  challengePostId: string;

  @Column({ name: 'writer_id', type: 'uuid' })
  writerId: string;

  @Column({ name: 'progress_id', type: 'uuid' })
  progressId: string;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'page_no', type: 'smallint', nullable: true })
  pageNo: number;

  @Column({
    name: 'post_image_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
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
