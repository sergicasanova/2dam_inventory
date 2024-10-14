import { Entity, Column, PrimaryGeneratedColumn /*OneToMany*/ } from 'typeorm';
//import { IssueConversationEntity } from '../issues_conversation/issues_conversation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  role: number;

  /*@OneToMany(
    () => IssueConversationEntity,
    (issueConversation) => issueConversation.user,
  )
  issueConversations: IssueConversationEntity[];*/
}
