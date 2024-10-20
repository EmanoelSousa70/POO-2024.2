var Circulo = /** @class */ (function () {
    function Circulo(raio) {
        this.raio = raio;
    }
    Circulo.prototype.calcularArea = function () {
        return Math.PI * Math.pow(this.raio, 2);
    };
    Circulo.prototype.calcularPerimetro = function () {
        return 2 * Math.PI * this.raio;
    };
    return Circulo;
}());
var meuCirculo = new Circulo(5);
console.log("Área do círculo:", meuCirculo.calcularArea().toFixed(2));
console.log("Perímetro do círculo:", meuCirculo.calcularPerimetro().toFixed(2));
