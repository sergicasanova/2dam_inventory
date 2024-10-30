import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateInventariDto {
  @IsString()
  num_serie: string;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsInt()
  GVA_cod_article: number;

  @IsString()
  GVA_description_cod_articulo: string;

  @IsString()
  status: string;

  @IsInt()
  id_type: number;

  @IsInt()
  fk_issue: number;

  @IsInt()
  id_classroom: number;
}

export class UpdateInventariDto {
  @IsOptional()
  @IsString()
  num_serie?: string;

  @IsOptional()
  @IsInt()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsInt()
  GVA_cod_article?: number;

  @IsOptional()
  @IsString()
  GVA_description_cod_articulo?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  fk_inventary_type?: number;

  @IsOptional()
  @IsInt()
  fk_issue?: number;

  @IsOptional()
  @IsInt()
  fk_classroom?: number;
}
