import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteService } from './cliente.service';
import { ClientesController } from './clientes.controller';

@Module({
  imports: [],
  controllers: [AppController, ClientesController],
  providers: [AppService, ClienteService],
})
export class AppModule {}
