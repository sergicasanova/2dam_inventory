export class CreateIssueConversationDto {
  readonly issue: number;
  readonly user?: number;
  readonly notes: string;
  readonly created_at?: string;
}
