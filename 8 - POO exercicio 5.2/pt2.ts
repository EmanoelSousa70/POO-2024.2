class Conta {
    id: number;
    numero: string;
    saldo: number;

    constructor(id: number, numero: string, saldo: number) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): void {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            console.error("Saldo insuficiente.");
        }
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }
}

class Banco {
    contas: Conta[];

    constructor() {
        this.contas = [];
    }

    inserir(conta: Conta): void {
        if (!this.contas.find(c => c.id === conta.id || c.numero === conta.numero)) {
            this.contas.push(conta);
        } else {
            console.error("Conta já existente.");
        }
    }

    consultar(numero: string): Conta | undefined {
        return this.contas.find(conta => conta.numero === numero);
    }

    consultarPorIndice(numero: string): number {
        return this.contas.findIndex(conta => conta.numero === numero);
    }

    excluir(numero: string): void {
        const indice = this.consultarPorIndice(numero);
        if (indice !== -1) {
            this.contas.splice(indice, 1);
        } else {
            console.error("Conta não encontrada.");
        }
    }

    atualizar(conta: Conta): void {
        const indice = this.consultarPorIndice(conta.numero);
        if (indice !== -1) {
            this.contas[indice] = conta;
        } else {
            console.error("Conta não encontrada.");
        }
    }

    sacar(numero: string, valor: number): void {
        const conta = this.consultar(numero);
        if (conta) conta.sacar(valor);
        else console.error("Conta não encontrada.");
    }

    depositar(numero: string, valor: number): void {
        const conta = this.consultar(numero);
        if (conta) conta.depositar(valor);
        else console.error("Conta não encontrada.");
    }

    transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        const contaOrigem = this.consultar(numeroOrigem);
        const contaDestino = this.consultar(numeroDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.sacar(valor);
            contaDestino.depositar(valor);
        } else {
            console.error("Conta de origem ou destino não encontrada.");
        }
    }

    transferirParaMultiplasContas(numeroOrigem: string, contasDestino: { numero: string, valor: number }[]): void {
        const contaOrigem = this.consultar(numeroOrigem);
        if (!contaOrigem) {
            console.error("Conta de origem não encontrada.");
            return;
        }

        for (const { numero, valor } of contasDestino) {
            const contaDestino = this.consultar(numero);
            if (contaDestino) {
                if (contaOrigem.saldo >= valor) {
                    contaOrigem.sacar(valor);
                    contaDestino.depositar(valor);
                } else {
                    console.error(`Saldo insuficiente para transferir ${valor} para a conta ${numero}.`);
                }
            } else {
                console.error(`Conta destino ${numero} não encontrada.`);
            }
        }
    }

    quantidadeDeContas(): number {
        return this.contas.length;
    }

    totalDinheiroDepositado(): number {
        return this.contas.reduce((total, conta) => total + conta.saldo, 0);
    }

    mediaSaldo(): number {
        const total = this.totalDinheiroDepositado();
        return this.quantidadeDeContas() ? total / this.quantidadeDeContas() : 0;
    }
}