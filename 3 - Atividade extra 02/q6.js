var Retangulo = /** @class */ (function () {
    function Retangulo(l1, l2) {
        this.l1 = l1;
        this.l2 = l2;
    }
    Retangulo.prototype.calcularArea = function () {
        return this.l1 * this.l2;
    };
    Retangulo.prototype.calcularPerimetro = function () {
        return 2 * (this.l1 + this.l2);
    };
    Retangulo.prototype.ehQuadrado = function () {
        return this.l1 === this.l2;
    };
    return Retangulo;
}());
var meuRetangulo = new Retangulo(5, 5);
console.log("Área :", meuRetangulo.calcularArea());
console.log("Perímetro :", meuRetangulo.calcularPerimetro());
console.log("É um quadrado ?", meuRetangulo.ehQuadrado());
