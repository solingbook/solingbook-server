import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './constant/role.enum';
import { Report } from 'src/reports/report.entity';
import { Review } from 'src/reviews/review.entity';
import { Challenge } from 'src/challenges/entity/challenge.entity';
import { Progress } from 'src/challenges/entity/progress.entity';
import { Essay } from 'src/verifications/entity/essay.entity';
import { ChallengePost } from 'src/verifications/entity/challengePost.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'email', type: 'varchar', unique: true, length: 100 })
  email: string;

  @Column({ name: 'nickname', type: 'varchar', unique: true, length: 50 })
  nickname: string;

  @Column({ name: 'password', type: 'varchar', length: 255, select: false })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ name: 'level', type: 'smallint', default: 1 })
  level: number;

  @Column({
    name: 'profile_img_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  profileImgUrl: string;

  @Column({ name: 'exp_points', type: 'integer', default: 0 })
  expPoints: number;

  @Column({ name: 'con_points', type: 'integer', default: 0 })
  conPoints: number;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'at', type: 'text', nullable: true })
  at: string | null;

  @Column({ name: 'rt', type: 'text', nullable: true })
  rt: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Report, (report) => report.reporter)
  reports: Report[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @OneToMany(() => Challenge, (challenge) => challenge.creator)
  challenges: Challenge[];

  @OneToMany(() => Progress, (progress) => progress.participant)
  progresses: Progress[];

  @OneToMany(() => Essay, (essay) => essay.writer)
  essays: Essay[];

  @OneToMany(() => ChallengePost, (challengePost) => challengePost.writer)
  challengePosts: ChallengePost[];
}
