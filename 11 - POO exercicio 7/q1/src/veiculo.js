"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veiculo = void 0;
var Veiculo = /** @class */ (function () {
    function Veiculo(placa, ano) {
        this.placa = placa;
        this.ano = ano;
    }
    Veiculo.prototype.info = function () {
        return "Ve\u00EDculo de placa ".concat(this.placa, ", ano ").concat(this.ano, ".");
    };
    return Veiculo;
}());
exports.Veiculo = Veiculo;
