import { Challenge } from 'src/challenges/entity/challenge.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity('verification_rules')
export class VerificationRule {
  @PrimaryGeneratedColumn('uuid', { name: 'verification_rule_id' })
  verificationRuleId: string;

  @RelationId(
    (verificationRule: VerificationRule) => verificationRule.challenge,
  )
  challengeId: string;

  @Column({ name: 'daily_min_mins', type: 'smallint', nullable: true })
  dailyMinMins: number;

  @Column({ name: 'target_days', type: 'smallint', nullable: true })
  targetDays: number;

  @Column({ name: 'post_required', type: 'boolean', default: false })
  postRequired: boolean;

  @Column({ name: 'essay_required', type: 'boolean', default: false })
  essayRequired: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToOne(() => Challenge, (challenge) => challenge.verificationRule, {
    nullable: false,
  })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;
}
