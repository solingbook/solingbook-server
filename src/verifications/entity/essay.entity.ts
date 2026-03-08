import { Progress } from 'src/challenges/entity/progress.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('essays')
export class Essay {
  @PrimaryGeneratedColumn('uuid', { name: 'essay_id' })
  essayId: string;

  @Column({ name: 'writer_id', type: 'uuid' })
  writerId: string;

  @Column({ name: 'progress_id', type: 'uuid' })
  progressId: string;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'is_public', type: 'boolean' })
  isPublic: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.essays, { nullable: false })
  @JoinColumn({ name: 'writer_id' })
  writer: User;

  @OneToOne(() => Progress, (progress) => progress.essay, {
    nullable: false,
  })
  @JoinColumn({ name: 'progress_id' })
  progress: Progress;
}
