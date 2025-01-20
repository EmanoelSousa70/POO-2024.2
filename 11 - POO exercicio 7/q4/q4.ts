class Conta {
    private _id: number;
    private _numero: string;
    private _saldo: number;
    private _cliente!: Cliente;

    constructor(numero: string, saldo: number) {
        this._id = 0;
        this._numero = numero;
        this._saldo = saldo;
    }

    public sacar(valor: number): void {
        this._saldo = this._saldo - valor;
    }

    public depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }

    public transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get numero(): string {
        return this._numero;
    }

    public get saldo(): number {
        return this._saldo;
    }

    public get cliente(): Cliente {
        return this._cliente;
    }

    public set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }
}

class Poupanca extends Conta {
    private _taxaJuros: number;

    constructor(numero: string, saldo: number, taxaJuros: number) {
        super(numero, saldo);
        this._taxaJuros = taxaJuros;
    }

    public renderJuros(): void {
        const juros = this.saldo * this._taxaJuros;
        this.depositar(juros);
        console.log(`Juros de R$${juros.toFixed(2)} renderizados na conta ${this.numero}.`);
    }

    public get taxaJuros(): number {
        return this._taxaJuros;
    }

    public set taxaJuros(taxa: number) {
        this._taxaJuros = taxa;
    }
}

class Cliente {
    private _id: number;
    private _nome: string;
    private _cpf: string;
    private _dataNascimento: Date;
    private _contas: Conta[];

    constructor(nome: string, cpf: string, dataNascimento: Date) {
        this._id = 0;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._contas = [];
    }

    public set id(id: number) {
        this._id = id;
    }

    public get nome(): string {
        return this._nome;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public adicionarConta(contaProcurada: Conta) {
        this._contas.push(contaProcurada);
    }

    public listarCopiaContas(): Conta[] {
        return this._contas.map((conta) => {
            const contaCopiada = conta instanceof Poupanca 
                ? new Poupanca(conta.numero, conta.saldo, conta.taxaJuros)
                : new Conta(conta.numero, conta.saldo);
            contaCopiada.id = conta.id;
            contaCopiada.cliente = conta.cliente;
            return contaCopiada;
        });
    }
}

class Banco {
    private _contas: Conta[] = [];
    private _clientes: Cliente[] = [];
    private _idClienteAtual: number = 0;
    private _idContaAtual: number = 0;

    public inserirConta(conta: Conta): void {
        conta.id = this._idContaAtual++;
        this._contas.push(conta);
    }

    public consultarConta(numero: string): Conta | undefined {
        return this._contas.find((conta) => conta.numero === numero);
    }

    public renderJuros(numero: string): void {
        const conta = this.consultarConta(numero);
        if (conta instanceof Poupanca) {
            conta.renderJuros();
        } else {
            console.log(`A conta ${numero} não é uma poupança ou não foi encontrada.`);
        }
    }

    public menu(): void {
        const menu = `
        Menu:
        1. Inserir Conta
        2. Render Juros
        3. Sair
        `;
        console.log(menu);
    }
}

// Testando
const banco = new Banco();
const cliente = new Cliente("João", "12345678900", new Date(1990, 1, 1));

const conta1 = new Conta("001", 1000);
const poupanca1 = new Poupanca("002", 500, 0.01);

banco.inserirConta(conta1);
banco.inserirConta(poupanca1);

banco.renderJuros("001"); // Deve informar que não é poupança
banco.renderJuros("002"); // Deve render juros
