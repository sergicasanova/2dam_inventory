import { IsString, IsOptional } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsOptional()
  description?: string;
}
