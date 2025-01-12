export class Veiculo {
    placa: string;
    ano: number;
  
    constructor(placa: string, ano: number) {
      this.placa = placa;
      this.ano = ano;
    }
  
    info(): string {
      return `Veículo de placa ${this.placa}, ano ${this.ano}.`;
    }
  }
  