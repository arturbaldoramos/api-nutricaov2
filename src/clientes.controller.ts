import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { Clientes } from "./cliente.model";

@Controller('clientes')
export class ClientesController {
    clientes: Clientes[] = [
        new Clientes({
            nome: "João",
            peso: 72,
            altura: 1.76,
            gordura: 10,
            imc: 15
        })
    ]



    @Get()
    obterTodos(): Clientes[] {
        return this.clientes;
    }

    @Get(':id')
    obterUm(@Param('id') ids): Clientes {
            const clienteNaoExiste = `Esse cliente não existe! Id:${ids}`
            const clientInfos = this.clientes.find( ({ id }) => id == ids);

        if(clientInfos == null){
            throw new NotFoundException(clienteNaoExiste)
        }

        return clientInfos
    }

    @Post()
    adicionar(@Body() cliente: Clientes) {
        const novoCliente = new Clientes(cliente);
        this.clientes.push(novoCliente);
        return novoCliente;
    }

    @Put(':id')
    alterar(@Param('id') ids, @Body() cliente: Clientes): Clientes {
        const clienteNaoExiste = `Esse cliente não existe! Id:${ids}`
        const clientInfos = this.clientes.find( ({ id }) => id == ids);

        if(clientInfos == null){
            throw new NotFoundException(clienteNaoExiste)
        }
        else{

            clientInfos.nome = cliente.nome
            clientInfos.peso = cliente.peso
            clientInfos.altura = cliente.altura
            clientInfos.gordura = cliente.gordura
            clientInfos.imc = cliente.imc   
            return clientInfos
        }

        
        
    }

    @Delete(':id')
    apagar(@Param('id') ids) {
        const findClient = this.clientes.findIndex( ({ id }) => id == ids);
        const clienteNaoExisteDelete = `Você não pode remover um cliente inexistente! Id:${ids}`

        if(findClient == -1){
            throw new NotFoundException(clienteNaoExisteDelete)
        }
        else {
            this.clientes.splice(findClient, 1);
            return `Cliente removido id:${ids}`
        }
        

    }
}