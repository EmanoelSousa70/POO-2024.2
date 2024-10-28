class Retangulo {
    
    l1: number;
    l2: number;
    
    constructor(l1: number, l2: number) {
        this.l1 = l1;
        this.l2 = l2;
    }

    calcularArea(): number {
        return this.l1 * this.l2;
    }
    calcularPerimetro(): number {
        return 2 * (this.l1 + this.l2);
    }

    ehQuadrado(): boolean {
        return this.l1 === this.l2;
    }
}

const meuRetangulo = new Retangulo(5, 5); 

console.log("Área :", meuRetangulo.calcularArea()); 
console.log("Perímetro :", meuRetangulo.calcularPerimetro()); 
console.log("É um quadrado ?", meuRetangulo.ehQuadrado()); 