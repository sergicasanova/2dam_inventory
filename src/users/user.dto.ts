// user.dto.ts
import {
  IsEmail,
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  Length,
} from 'class-validator';
import { IssueConversationEntity } from '../issues_conversation/issues_conversation.entity';
import { Issue } from '../issues/issues.entity';

export class UserDto {
  @IsOptional()
  @IsInt()
  id_user?: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @Length(1, 50)
  surname: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  @Max(1)
  role: number;

  @IsOptional()
  issueConversations?: IssueConversationEntity[];

  @IsOptional()
  issues?: Issue[];

  @IsOptional()
  assignedIssues?: Issue[];
}
