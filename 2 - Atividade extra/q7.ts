class Retangulo {
   
    l1: number = 0;
    l2: number = 0;

    
    calcularArea(): number {
        return this.l1 * this.l2;
    }

   
    calcularPerimetro(): number {
        return 2 * (this.l1 + this.l2);
    }
}


const retangulo = new Retangulo();
retangulo.l1 = 5;
retangulo.l2 = 10;

console.log("Área:", retangulo.calcularArea());  
console.log("Perímetro:", retangulo.calcularPerimetro());