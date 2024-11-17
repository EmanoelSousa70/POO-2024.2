class Triangulo {
    ladoA: number;
    ladoB: number;
    ladoC: number;
  
    constructor(ladoA: number, ladoB: number, ladoC: number) {
      this.ladoA = ladoA;
      this.ladoB = ladoB;
      this.ladoC = ladoC;
    }
  
    formaTriangulo(): boolean {
      return (
        Math.abs(this.ladoB - this.ladoC) < this.ladoA &&
        this.ladoA < this.ladoB + this.ladoC
      );
    }
  
    ehIsoceles(): boolean {
      return this.formaTriangulo() && 
             (this.ladoA === this.ladoB || this.ladoA === this.ladoC || this.ladoB === this.ladoC);
    }
  
    ehEquilatero(): boolean {
      return this.formaTriangulo() && 
             this.ladoA === this.ladoB && this.ladoB === this.ladoC;
    }
  
    ehEscaleno(): boolean {
      return this.formaTriangulo() && 
             this.ladoA !== this.ladoB && this.ladoB !== this.ladoC && this.ladoA !== this.ladoC;
    }
  }
  
  // Testessss
  const triangulo1 = new Triangulo(3, 3, 3);
  console.log(triangulo1.ehEquilatero()); 
  console.log(triangulo1.ehIsoceles());  
  console.log(triangulo1.ehEscaleno()); 
  
  const triangulo2 = new Triangulo(3, 4, 5);
  console.log(triangulo2.ehEquilatero()); 
  console.log(triangulo2.ehEscaleno());  