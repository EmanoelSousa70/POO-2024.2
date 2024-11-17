class Conta {
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
  
    transferir(destino: Conta, valor: number): boolean {
      if (this.sacar(valor)) {
        destino.saldo += valor;
        return true;
      }
      return false;
    }
  
    consultarSaldo(): number {
      return this.saldo;
    }
  }
  
  // Testeeee
  const conta1 = new Conta("1", 100);
  const conta2 = new Conta("2", 50);
  conta1.transferir(conta2, 30);
  console.log(conta1.consultarSaldo()); 
  console.log(conta2.consultarSaldo()); 
  