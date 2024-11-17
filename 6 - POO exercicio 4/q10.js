var Jogador = /** @class */ (function () {
    function Jogador(forca, nivel, pontos) {
        this.forca = forca;
        this.nivel = nivel;
        this.pontos = pontos;
    }
    Jogador.prototype.calcularAtaque = function () {
        return this.forca * this.nivel;
    };
    Jogador.prototype.atacar = function (adversario) {
        if (adversario.estaVivo()) {
            adversario.pontos -= this.calcularAtaque();
        }
    };
    Jogador.prototype.estaVivo = function () {
        return this.pontos > 0;
    };
    Jogador.prototype.toString = function () {
        return "For\u00E7a: ".concat(this.forca, ", N\u00EDvel: ").concat(this.nivel, ", Pontos: ").concat(this.pontos);
    };
    return Jogador;
}());
// testessss
var jogador1 = new Jogador(10, 5, 100);
var jogador2 = new Jogador(8, 6, 80);
jogador1.atacar(jogador2);
jogador2.atacar(jogador1);
console.log(jogador1.toString());
console.log(jogador2.toString());
