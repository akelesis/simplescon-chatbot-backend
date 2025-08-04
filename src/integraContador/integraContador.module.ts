import { Module } from '@nestjs/common';
import { IntegraContadorController } from './integraContador.controller';
import { IntegraContadorService } from './integraContador.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IntegraContadorController],
  providers: [IntegraContadorService],
})
export class IntegraContadorModule {}