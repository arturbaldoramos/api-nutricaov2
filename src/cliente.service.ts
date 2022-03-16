import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Clientes } from './cliente.model';

@Injectable()
export class ClienteService {

    clientes: Clientes[] = [
        new Clientes({
            nome: "João",
            peso: 72,
            altura: 1.76,
            gordura: 10,
            imc: 15
        })
    ];

    obterTodos(): Clientes[] {
        return this.clientes;
    }

    obterUm(ids: number): Clientes {
        const clienteNaoExiste = `Esse cliente não existe! Id:${ids}`
        const clientInfos = this.clientes.find(({ id }) => id == ids);

        if (clientInfos == null) {
            throw new NotFoundException(clienteNaoExiste)
        }

        return clientInfos
    }

    adicionar(cliente: Clientes) {
        const novoCliente = new Clientes(cliente);
        this.validaPaciente(cliente);
        this.clientes.push(novoCliente);
        return novoCliente;
    }

    alterar(ids: number, cliente: Clientes): Clientes {
        const clienteNaoExiste = `Esse cliente não existe! Id:${ids}`
        const clientInfos = this.clientes.find(({ id }) => id == ids);

        if (clientInfos == null) {
            throw new NotFoundException(clienteNaoExiste)
        }
        else{
            this.validaPaciente(cliente);

            clientInfos.nome = cliente.nome
            clientInfos.peso = cliente.peso
            clientInfos.altura = cliente.altura
            clientInfos.gordura = cliente.gordura
            clientInfos.imc = cliente.imc
            return clientInfos
        }
    }

    apagar(ids: number) {
        const findClient = this.clientes.findIndex(({ id }) => id == ids);
        const clienteNaoExisteDelete = `Você não pode remover um cliente inexistente! Id:${ids}`

        if (findClient == -1) {
            throw new NotFoundException(clienteNaoExisteDelete)
        }
        else {
            this.clientes.splice(findClient, 1);
            return `Cliente removido id:${ids}`
        }
    }

    private validaPaciente(cliente: Clientes) {

        var pesoEhValido = this.validaPeso(cliente);
        var alturaEhValida = this.validaAltura(cliente);

        if (!pesoEhValido) {
            throw new UnprocessableEntityException(`O peso do cliente é inválido (${cliente.peso})`);
        }

        if (!alturaEhValida) {
            throw new UnprocessableEntityException(`A altura do cliente é inválida (${cliente.altura})`);
        }
    }

    private validaPeso(cliente: Clientes) {
        return cliente.peso > 0 && cliente.peso < 500;
    }

    private validaAltura(cliente: Clientes) {
        return cliente.altura > 0 && cliente.altura <= 3.00;
    }

}

