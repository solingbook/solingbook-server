import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('deleted_users')
export class DeletedUser {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;

  @Column({ name: 'nickname', type: 'varchar', length: 50 })
  nickname: string;

  @Column({ name: 'created_at', type: 'timestamp' }) // 가입일자
  createdAt: Date;

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ name: 'deletion_reason', type: 'varchar', length: 500 })
  deletionReason: string;
}
