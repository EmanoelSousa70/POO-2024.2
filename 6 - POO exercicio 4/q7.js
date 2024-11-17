var Triangulo = /** @class */ (function () {
    function Triangulo(ladoA, ladoB, ladoC) {
        this.ladoA = ladoA;
        this.ladoB = ladoB;
        this.ladoC = ladoC;
    }
    Triangulo.prototype.formaTriangulo = function () {
        return (Math.abs(this.ladoB - this.ladoC) < this.ladoA &&
            this.ladoA < this.ladoB + this.ladoC);
    };
    Triangulo.prototype.ehIsoceles = function () {
        return this.formaTriangulo() &&
            (this.ladoA === this.ladoB || this.ladoA === this.ladoC || this.ladoB === this.ladoC);
    };
    Triangulo.prototype.ehEquilatero = function () {
        return this.formaTriangulo() &&
            this.ladoA === this.ladoB && this.ladoB === this.ladoC;
    };
    Triangulo.prototype.ehEscaleno = function () {
        return this.formaTriangulo() &&
            this.ladoA !== this.ladoB && this.ladoB !== this.ladoC && this.ladoA !== this.ladoC;
    };
    return Triangulo;
}());
// Testessss
var triangulo1 = new Triangulo(3, 3, 3);
console.log(triangulo1.ehEquilatero());
console.log(triangulo1.ehIsoceles());
console.log(triangulo1.ehEscaleno());
var triangulo2 = new Triangulo(3, 4, 5);
console.log(triangulo2.ehEquilatero());
console.log(triangulo2.ehEscaleno());
