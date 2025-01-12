"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculadora = void 0;
var Calculadora = /** @class */ (function () {
    function Calculadora(operando1, operando2) {
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
    Calculadora.prototype.somar = function () {
        return this.operando1 + this.operando2;
    };
    return Calculadora;
}());
exports.Calculadora = Calculadora;
