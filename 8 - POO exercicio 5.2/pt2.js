"use strict";
class Conta {
    constructor(id, numero, saldo) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
    }
    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        }
        else {
            console.error("Saldo insuficiente.");
        }
    }
    depositar(valor) {
        this.saldo += valor;
    }
    consultarSaldo() {
        return this.saldo;
    }
}
class Banco {
    constructor() {
        this.contas = [];
    }
    inserir(conta) {
        if (!this.contas.find(c => c.id === conta.id || c.numero === conta.numero)) {
            this.contas.push(conta);
        }
        else {
            console.error("Conta já existente.");
        }
    }
    consultar(numero) {
        return this.contas.find(conta => conta.numero === numero);
    }
    consultarPorIndice(numero) {
        return this.contas.findIndex(conta => conta.numero === numero);
    }
    excluir(numero) {
        const indice = this.consultarPorIndice(numero);
        if (indice !== -1) {
            this.contas.splice(indice, 1);
        }
        else {
            console.error("Conta não encontrada.");
        }
    }
    atualizar(conta) {
        const indice = this.consultarPorIndice(conta.numero);
        if (indice !== -1) {
            this.contas[indice] = conta;
        }
        else {
            console.error("Conta não encontrada.");
        }
    }
    sacar(numero, valor) {
        const conta = this.consultar(numero);
        if (conta)
            conta.sacar(valor);
        else
            console.error("Conta não encontrada.");
    }
    depositar(numero, valor) {
        const conta = this.consultar(numero);
        if (conta)
            conta.depositar(valor);
        else
            console.error("Conta não encontrada.");
    }
    transferir(numeroOrigem, numeroDestino, valor) {
        const contaOrigem = this.consultar(numeroOrigem);
        const contaDestino = this.consultar(numeroDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.sacar(valor);
            contaDestino.depositar(valor);
        }
        else {
            console.error("Conta de origem ou destino não encontrada.");
        }
    }
    transferirParaMultiplasContas(numeroOrigem, contasDestino) {
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
                }
                else {
                    console.error(`Saldo insuficiente para transferir ${valor} para a conta ${numero}.`);
                }
            }
            else {
                console.error(`Conta destino ${numero} não encontrada.`);
            }
        }
    }
    quantidadeDeContas() {
        return this.contas.length;
    }
    totalDinheiroDepositado() {
        return this.contas.reduce((total, conta) => total + conta.saldo, 0);
    }
    mediaSaldo() {
        const total = this.totalDinheiroDepositado();
        return this.quantidadeDeContas() ? total / this.quantidadeDeContas() : 0;
    }
}
