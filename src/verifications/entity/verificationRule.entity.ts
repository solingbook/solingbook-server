import { Challenge } from 'src/challenges/entity/challenge.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('verification_rules')
export class VerificationRule {
  @PrimaryGeneratedColumn('uuid', { name: 'verification_rule_id' })
  verificationRuleId: string;

  @Column({ name: 'challenge_id', type: 'uuid' })
  challengeId: string;

  @Column({ name: 'timer_daily_minutes', type: 'smallint' })
  timerDailyMinutes: number;

  @Column({ name: 'timer_required_days', type: 'smallint' })
  timerRequiredDays: number;

  @Column({ name: 'post_enabled', type: 'boolean', default: false })
  postEnabled: boolean;

  @Column({ name: 'post_required_count', type: 'smallint', nullable: true })
  postRequiredCount: number;

  @Column({ name: 'essay_enabled', type: 'boolean', default: false })
  essayEnabled: boolean;

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
