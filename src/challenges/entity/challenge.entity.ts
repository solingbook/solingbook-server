import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Progress } from './progress.entity';
import { Phase } from '../constant/phase.enum';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid', { name: 'challenge_id' })
  challengeId: string;

  @RelationId((challenge: Challenge) => challenge.creator)
  @Column({ name: 'creator_id', type: 'uuid' })
  creatorId: string;

  // TODO: book 테이블 생성 후 FK 설정, not null
  //   @RelationId((challenge: Challenge) => challenge.bookId)
  @Column({ name: 'book_id', type: 'uuid', nullable: true })
  bookId: string;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({
    name: 'phase',
    type: 'enum',
    enum: Phase,
    default: Phase.RECRUITING,
  })
  phase: Phase;

  @Column({ name: 'max_participants', type: 'smallint' })
  maxParticipants: number;

  @Column({ name: 'recruit_end_date', type: 'date' })
  recruitEndDate: Date;

  @Column({ name: 'duration_days', type: 'smallint' })
  durationDays: number;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.challenges, { nullable: false })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(() => Progress, (progress) => progress.challengeId)
  progress: Progress[];
}
