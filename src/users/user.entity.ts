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
import { Challenge } from 'src/challenges/challenge.entity';
import { Progress } from 'src/challenges/progress.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'email', type: 'varchar', unique: true, length: 255 })
  email: string;

  @Column({ name: 'username', type: 'varchar', unique: true, length: 50 })
  username: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Report, (report) => report.reporterId)
  reports: Report[];

  @OneToMany(() => Challenge, (challenge) => challenge.creatorId)
  challenges: Challenge[];

  @OneToMany(() => Progress, (progress) => progress.participantId)
  progresses: Progress[];
}
