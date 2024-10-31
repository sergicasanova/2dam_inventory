import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({}, { each: true })
  issues?: number[];
}

export class UpdateStatusDto {
  @IsString()
  @IsOptional()
  description?: string;
}
