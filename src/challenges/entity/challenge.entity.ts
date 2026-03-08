import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Progress } from './progress.entity';
import { Phase } from '../constant/phase.enum';
import { VerificationRule } from 'src/verifications/entity/verificationRule.entity';
import { Book } from 'src/books/book.entity';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid', { name: 'challenge_id' })
  challengeId: string;

  @Column({ name: 'creator_id', type: 'uuid' })
  creatorId: string;

  @Column({ name: 'book_id', type: 'uuid' })
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

  @OneToMany(() => Progress, (progress) => progress.challenge)
  progresses: Progress[];

  @OneToOne(
    () => VerificationRule,
    (verificationRule) => verificationRule.challenge,
  )
  verificationRule: VerificationRule;

  @ManyToOne(() => Book, (book) => book.challenges, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
