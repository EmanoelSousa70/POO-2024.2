// Classe Radio corrigida com um valor padrão no construtor
class Radio {
    volume: number;
  
    constructor(volume: number = 0) { //  classe Radio exige um parâmetro volume, mas o objeto foi instanciado sem argumentos. Isso causa erro.
        
      this.volume = volume;  // so adicionar e pronto .
    }
  }
  
  let r: Radio = new Radio(); 
  r.volume = 10;
  console.log(r.volume); 
  