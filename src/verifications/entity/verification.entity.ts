import { Challenge } from 'src/challenges/entity/challenge.entity';
import { Progress } from 'src/challenges/entity/progress.entity';
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
import { VerificationType } from '../constant/verificationType.enum';

@Entity('verifications')
export class Verification {
  @PrimaryGeneratedColumn('uuid', { name: 'verification_id' })
  verificationId: string;

  @RelationId((verification: Verification) => verification.progress)
  progressId: string;

  @RelationId((verification: Verification) => verification.challenge)
  challengeId: string;

  @Column({
    name: 'verification_type',
    type: 'enum',
    enum: VerificationType,
    nullable: true,
  })
  verificationType: VerificationType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Progress, (progress) => progress.verifications, {
    nullable: false,
  })
  @JoinColumn({ name: 'progress_id' })
  progress: Progress;

  @ManyToOne(() => Challenge, (challenge) => challenge.verifications, {
    nullable: false,
  })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;
}
