import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity('api_log')
export class ApiLog {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'bigint' })
  id: bigint;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ name: 'method', type: 'varchar', length: 10 })
  method: string;

  @Column({ name: 'endpoint', type: 'varchar', length: 512 })
  endpoint: string;

  @Column({ name: 'status_code', type: 'smallint' })
  statusCode: number;

  @Column({
    name: 'response_time_ms',
    type: 'int',
    nullable: true,
  })
  responseTimeMs: number;

  @Column({
    name: 'ip_address',
    type: 'inet',
    nullable: true,
  })
  ipAddress: string;

  @Column({
    name: 'user_agent',
    type: 'text',
    nullable: true,
  })
  userAgent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
