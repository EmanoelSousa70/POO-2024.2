var Retangulo = /** @class */ (function () {
    function Retangulo() {
        this.l1 = 0;
        this.l2 = 0;
    }
    Retangulo.prototype.calcularArea = function () {
        return this.l1 * this.l2;
    };
    Retangulo.prototype.calcularPerimetro = function () {
        return 2 * (this.l1 + this.l2);
    };
    return Retangulo;
}());
var retangulo = new Retangulo();
retangulo.l1 = 5;
retangulo.l2 = 10;
console.log("Área:", retangulo.calcularArea());
console.log("Perímetro:", retangulo.calcularPerimetro());
