import { Carro } from './carro';

export class CarroEletrico extends Carro {
  autonomiaBateria: number;

  constructor(placa: string, ano: number, modelo: string, autonomiaBateria: number) {
    super(placa, ano, modelo);
    this.autonomiaBateria = autonomiaBateria;
  }

  info(): string {
    return `${super.info()} Autonomia da bateria: ${this.autonomiaBateria} km.`;
  }
}
