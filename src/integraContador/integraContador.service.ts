import { Injectable } from '@nestjs/common';
import { ConsultaDto } from './dtos/integraContador.dto';

@Injectable()
export class IntegraContadorService {
  async consultar(dto: ConsultaDto) {
    const { cnpj, serviceCode } = dto;

    let servicePath = ''
    
    switch (serviceCode) {
      case '1':
        servicePath = '/Emitir'
        break;
      case '2':
        servicePath = '/Consultar'
        break;
      case '3':
        servicePath = '/Declarar'
        break;
      default:
        break;
    }
  }
}