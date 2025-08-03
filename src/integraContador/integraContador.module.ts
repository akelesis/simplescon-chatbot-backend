import { Module } from '@nestjs/common';
import { IntegraContadorController } from './integraContador.controller';
import { IntegraContadorService } from './integraContador.service';

@Module({
  controllers: [IntegraContadorController],
  providers: [IntegraContadorService],
})
export class IntegraContadorModule {}