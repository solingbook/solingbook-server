import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChallengeResultStatus } from '../constant/status.enum';

@Entity('challenge_results')
export class ChallengeResults {
  @PrimaryGeneratedColumn('uuid', { name: 'challenge_result_id' })
  challengeResultId: string;

  // TODO: FK 설정 필요(progress.progressId)
  @Column({ name: 'progress_id', type: 'uuid', unique: true })
  progressId: string;

  @Column({
    name: 'result_status',
    type: 'enum',
    enum: ChallengeResultStatus,
    nullable: true,
  })
  challengeResultStatus: ChallengeResultStatus;

  @Column({ name: 'earned_exp_points', type: 'integer', default: 0 })
  earnedExpPoints: number;

  @Column({ name: 'earned_con_points', type: 'integer', default: 0 })
  earnedConPoints: number;

  @CreateDateColumn({ name: 'completed_at' })
  completedAt: Date;
}
