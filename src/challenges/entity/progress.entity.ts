import { User } from 'src/users/user.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';
import {
  COMPLETED_CHECK,
  DONE_ESSAY_CHECK,
  DONE_POST_CHECK,
  DONE_READ_CHECK,
  DONE_TIME_CHECK,
} from '../constant/constraints';
import { Essay } from 'src/verifications/entity/essay.entity';
import { ChallengePost } from 'src/verifications/entity/challengePost.entity';
import { Verification } from 'src/verifications/entity/verification.entity';

@Entity('progress')
@Unique('uq_progress_challenge', ['participantId', 'challengeId'])
@Check(DONE_READ_CHECK)
@Check(DONE_TIME_CHECK)
@Check(DONE_POST_CHECK)
@Check(DONE_ESSAY_CHECK)
@Check(COMPLETED_CHECK)
export class Progress {
  @PrimaryGeneratedColumn('uuid', { name: 'progress_id' })
  progressId: string;

  @Column({ name: 'participant_id', type: 'uuid' })
  participantId: string;

  @Column({ name: 'challenge_id', type: 'uuid' })
  challengeId: string;

  @Column({ name: 'total_read_mins', type: 'smallint', default: 0 })
  totalReadMins: number;

  @Column({ name: 'is_done_read', type: 'boolean', default: false })
  isDoneRead: boolean;

  @Column({ name: 'done_read_at', type: 'timestamp', nullable: true })
  doneReadAt: Date;

  @Column({ name: 'is_done_time', type: 'boolean', default: false })
  isDoneTime: boolean;

  @Column({ name: 'done_time_at', type: 'timestamp', nullable: true })
  doneTimeAt: Date;

  @Column({ name: 'is_done_post', type: 'boolean', default: false })
  isDonePost: boolean;

  @Column({ name: 'done_post_at', type: 'timestamp', nullable: true })
  donePostAt: Date;

  @Column({ name: 'page_no', type: 'smallint', nullable: true })
  pageNo: number;

  @Column({ name: 'page_no_updated_at', type: 'timestamp', nullable: true })
  pageNoUpdatedAt: Date;

  @Column({ name: 'is_done_essay', type: 'boolean', default: false })
  isDoneEssay: boolean;

  @Column({ name: 'done_essay_at', type: 'timestamp', nullable: true })
  doneEssayAt: Date;

  @Column({ name: 'is_completed', type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.progresses, { nullable: false })
  @JoinColumn({ name: 'participant_id' })
  participant: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.progresses, {
    nullable: false,
  })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  @OneToOne(() => Essay, (essay) => essay.progress)
  essay: Essay;

  @OneToMany(() => ChallengePost, (challengePost) => challengePost.progress)
  challengePosts: ChallengePost[];

  @OneToMany(() => Verification, (verification) => verification.progress)
  verifications: Verification[];
}
