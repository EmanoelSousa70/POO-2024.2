import { Veiculo } from './veiculo';

export class Carro extends Veiculo {
  modelo: string;

  constructor(placa: string, ano: number, modelo: string) {
    super(placa, ano);
    this.modelo = modelo;
  }

  info(): string {
    return `${super.info()} Modelo: ${this.modelo}.`;
  }
}
