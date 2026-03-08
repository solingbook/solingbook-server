import { Challenge } from 'src/challenges/entity/challenge.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid', { name: 'book_id' })
  bookId: string;

  @Column({
    name: 'isbn',
    type: 'varchar',
    unique: true,
    length: 20,
    nullable: true,
  })
  isbn: string;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'author', type: 'varchar', length: 200 })
  author: string;

  @Column({ name: 'total_pages', type: 'smallint', nullable: true })
  totalPages: number;

  @Column({ name: 'thumb_img_url', type: 'text' })
  thumbImgUrl: string;

  @Column({ name: 'is_validated', type: 'boolean', default: false })
  isValidated: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Challenge, (challenge) => challenge.challengeId)
  challenges: Challenge[];
}
