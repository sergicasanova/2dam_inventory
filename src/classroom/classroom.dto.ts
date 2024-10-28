import { IsString, IsOptional } from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  description: string;
}

export class UpdateClassroomDto {
  @IsString()
  @IsOptional()
  description?: string;
}

