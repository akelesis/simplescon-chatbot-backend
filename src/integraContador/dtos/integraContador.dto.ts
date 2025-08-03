import { IsString, IsNotEmpty } from 'class-validator';

export class ConsultaDto {
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  serviceCode: string;
}