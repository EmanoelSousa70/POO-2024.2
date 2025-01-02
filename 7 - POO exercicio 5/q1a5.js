"use strict";
class Cliente {
    constructor(id, nome, cpf, dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = [];
    }
}
class Conta {
    constructor(id, numero, saldo) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
    }
    sacar(valor) {
        this.saldo -= valor;
    }
    depositar(valor) {
        this.saldo += valor;
    }
    consultarSaldo() {
        return this.saldo;
    }
    transferir(contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}
class Banco {
    constructor() {
        this.clientes = [];
        this.contas = [];
    }
    inserirCliente(cliente) {
        if (this.clientes.some(c => c.id === cliente.id || c.cpf === cliente.cpf)) {
            throw new Error('Cliente com ID ou CPF já cadastrado.');
        }
        this.clientes.push(cliente);
    }
    consultarCliente(cpf) {
        const cliente = this.clientes.find(c => c.cpf === cpf);
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }
        return cliente;
    }
    inserirConta(conta) {
        if (this.contas.some(c => c.id === conta.id || c.numero === conta.numero)) {
            throw new Error('Conta com ID ou número já cadastrada.');
        }
        this.contas.push(conta);
    }
    associarContaCliente(numeroConta, cpfCliente) {
        const cliente = this.consultarCliente(cpfCliente);
        const conta = this.contas.find(c => c.numero === numeroConta);
        if (!conta) {
            throw new Error('Conta não encontrada.');
        }
        if (conta.cliente) {
            throw new Error('Conta já está associada a um cliente.');
        }
        if (cliente.contas.some(c => c.numero === numeroConta)) {
            throw new Error('Cliente já possui essa conta associada.');
        }
        cliente.contas.push(conta);
        conta.cliente = cliente;
    }
    listarContasCliente(cpf) {
        const cliente = this.consultarCliente(cpf);
        return cliente.contas;
    }
    totalizarSaldoCliente(cpf) {
        const cliente = this.consultarCliente(cpf);
        return cliente.contas.reduce((total, conta) => total + conta.saldo, 0);
    }
}
// Testesss o código
const banco = new Banco();
const cliente1 = new Cliente(1, 'João Silva', '12345678901', new Date('1990-01-01'));
const cliente2 = new Cliente(2, 'Maria Santos', '98765432100', new Date('1995-05-15'));
banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);
const conta1 = new Conta(1, '111-1', 100);
const conta2 = new Conta(2, '222-2', 200);
banco.inserirConta(conta1);
banco.inserirConta(conta2);
banco.associarContaCliente('111-1', '12345678901');
banco.associarContaCliente('222-2', '98765432100');
console.log(banco.listarContasCliente('12345678901'));
console.log(banco.totalizarSaldoCliente('12345678901'));
