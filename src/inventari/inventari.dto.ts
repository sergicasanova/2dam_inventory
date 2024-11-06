import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateInventariDto {
    @IsInt()
    id_inventory?: number;

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
    @IsNotEmpty()
    id_type: number;
    
    @IsInt()
    @IsNotEmpty()
    id_classroom: number;
    
  }

  export class UpdateInventariDto {
    @IsOptional()
    @IsInt()
    id_inventory?: number;

    @IsOptional()
    @IsString()
    num_serie?: string;
  
    @IsOptional()
    @IsString()
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
    fk_classroom?: number;
  }