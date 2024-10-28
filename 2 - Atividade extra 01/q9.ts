class SituacaoFinanceira {
    valorCreditos: number;
    valorDebitos: number;

    constructor(valorCreditos: number, valorDebitos: number) {
        this.valorCreditos = valorCreditos;  
        this.valorDebitos = valorDebitos;    
    }

    calcularSaldo(): number {
        return this.valorCreditos - this.valorDebitos; 
    }
}


const minhaSituacao = new SituacaoFinanceira(1000, 400); 


console.log("Saldo:", minhaSituacao.calcularSaldo()); 
