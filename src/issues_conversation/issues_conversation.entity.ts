import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Issue } from '../issues/issues.entity';
import { User } from '../users/users.entity';

@Entity('issue_conversation')
export class IssueConversationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Issue, (issue) => issue.conversations)
  issue: Issue;

  @ManyToOne(() => User)
  user: User;

  @Column()
  notes: string;

  @Column({ type: 'timestamp' })
  create_at: Date;
}
