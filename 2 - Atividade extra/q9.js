var SituacaoFinanceira = /** @class */ (function () {
    function SituacaoFinanceira(valorCreditos, valorDebitos) {
        this.valorCreditos = valorCreditos;
        this.valorDebitos = valorDebitos;
    }
    SituacaoFinanceira.prototype.calcularSaldo = function () {
        return this.valorCreditos - this.valorDebitos;
    };
    return SituacaoFinanceira;
}());
var minhaSituacao = new SituacaoFinanceira(1000, 400);
console.log("Saldo:", minhaSituacao.calcularSaldo());
