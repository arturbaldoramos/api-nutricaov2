import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Clientes } from "./cliente.model";
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get()
    obterTodos(): Clientes[] {
        return this.clienteService.obterTodos();
    }

    @Get(':id')
    obterUm(@Param('id') ids): Clientes {
        return this.clienteService.obterUm(ids);
    }

    @Post()
    adicionar(@Body() cliente: Clientes) {
        return this.clienteService.adicionar(cliente);
    }

    @Put(':id')
    alterar(@Param('id') ids, @Body() cliente: Clientes): Clientes {
        return this.clienteService.alterar(ids, cliente);
    }

    @Delete(':id')
    apagar(@Param('id') ids) {
        return this.clienteService.apagar(ids);
    }
}