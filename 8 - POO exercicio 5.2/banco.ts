export class Conta {
    numero: string;
    saldo: number;
  
    constructor(numero: string, saldo: number) {
      this.numero = numero;
      this.saldo = saldo;
    }
  
    sacar(valor: number): boolean {
      if (this.saldo >= valor) {
        this.saldo -= valor;
        return true;
      }
      return false;
    }
  
    depositar(valor: number): void {
      this.saldo += valor;
    }
  
    transferir(contaDestino: Conta, valor: number): boolean {
      if (this.sacar(valor)) {
        contaDestino.depositar(valor);
        return true;
      }
      return false;
    }
  }
  
  export class Banco {
    contas: Conta[] = [];
  
    inserir(conta: Conta): void {
      this.contas.push(conta);
    }
  
    consultar(numero: string): Conta | undefined {
      return this.contas.find((conta) => conta.numero === numero);
    }
  
    excluir(numero: string): void {
      this.contas = this.contas.filter((conta) => conta.numero !== numero);
    }
  
    sacar(numero: string, valor: number): boolean {
      const conta = this.consultar(numero);
      return conta ? conta.sacar(valor) : false;
    }
  
    depositar(numero: string, valor: number): void {
      const conta = this.consultar(numero);
      if (conta) conta.depositar(valor);
    }
  
    transferir(numeroOrigem: string, numeroDestino: string, valor: number): boolean {
      const contaOrigem = this.consultar(numeroOrigem);
      const contaDestino = this.consultar(numeroDestino);
      if (contaOrigem && contaDestino) {
        return contaOrigem.transferir(contaDestino, valor);
      }
      return false;
    }
  
    totalDinheiro(): number {
      return this.contas.reduce((total, conta) => total + conta.saldo, 0);
    }
  
    quantidadeContas(): number {
      return this.contas.length;
    }
  
    mediaSaldo(): number {
      const total = this.totalDinheiro();
      const quantidade = this.quantidadeContas();
      return quantidade > 0 ? total / quantidade : 0;
    }
  }
  