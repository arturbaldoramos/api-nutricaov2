import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesController } from './clientes.controller';

@Module({
  imports: [],
  controllers: [AppController, ClientesController],
  providers: [AppService],
})
export class AppModule {}
