
export class Clientes {

    private static id = 0;

    id?: number;
    nome: string;
    peso: number;
    altura: number;
    gordura: number;
    imc: number;

    // constructor(id: number, nome: string, peso: number, altura: number, gordura: number, imc: number) {
    //     this.id = id;
    //     this.nome = nome;
    //     this.peso = peso;
    //     this.altura = altura;
    //     this.gordura = gordura
    //     this.imc = imc
    // }

    constructor(obj: Clientes) {
        this.id = Clientes.nextId();
        delete obj.id;
        Object.assign(this, obj)
    }

    private static nextId() {
        return ++Clientes.id;
    }
}

