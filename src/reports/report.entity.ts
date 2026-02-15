import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  Column,
} from 'typeorm';
import { TargetType } from './constant/targetType.enum';
import { User } from 'src/users/user.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid', { name: 'report_id' })
  reportId: string;

  @ManyToOne(() => User, (user) => user.reports, { nullable: false })
  @JoinColumn({ name: 'reporter_id' })
  reporter: User;

  @RelationId((report: Report) => report.reporter)
  @Column({ name: 'reporter_id', type: 'uuid', unique: true })
  reporterId: string;

  @Column({ name: 'target_type', type: 'enum', enum: TargetType })
  targetType: TargetType;

  @Column({ name: 'target_id', type: 'uuid' })
  targetId: string;

  @Column({ name: 'reason', type: 'text' })
  reason: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
