class Saudacao {
    texto: string;
    destinatario: string;
  
    constructor(texto: string, destinatario: string) {
      this.texto = texto;
      this.destinatario = destinatario;
    }
  
    obterSaudacao(): string {
      return `${this.texto}, ${this.destinatario}`;
    }
  }
  
  
  const saudacao = new Saudacao("Bom dia", "Emanoel");
  console.log(saudacao.obterSaudacao()); 
  