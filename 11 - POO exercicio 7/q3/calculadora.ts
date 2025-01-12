export class Calculadora {
    private operando1: number;
    private operando2: number;
  
    constructor(operando1: number, operando2: number) {
      this.operando1 = operando1;
      this.operando2 = operando2;
    }
  
    soma(): number {
      return this.operando1 + this.operando2;
    }
  }
  