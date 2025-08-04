import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegraContadorController } from './integraContador/integraContador.controller';
import { IntegraContadorService } from './integraContador/integraContador.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, IntegraContadorController],
  providers: [AppService, IntegraContadorService],
})
export class AppModule {}
