import { Body, Controller, Post } from '@nestjs/common';
import { IntegraContadorService } from './integraContador.service';
import { ConsultaDto } from './dtos/integraContador.dto'

@Controller('integra-contador')
export class IntegraContadorController {
  constructor(private readonly integraContadorService: IntegraContadorService) {}

  @Post('consulta')
  async consulta(@Body() dto: ConsultaDto) {
    return this.integraContadorService.consultar(dto);
  }
}