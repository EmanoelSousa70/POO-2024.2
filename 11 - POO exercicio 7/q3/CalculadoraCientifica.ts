import { Calculadora } from './calculadora'; 

export class CalculadoraCientifica extends Calculadora {
  constructor(operando1: number, operando2: number) {
    super(operando1, operando2);
  }

  exponenciar(): number {
    return Math.pow(this['operando1'], this['operando2']); //privt
  }
}
