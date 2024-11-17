var Conta = /** @class */ (function () {
    function Conta(numero, saldo) {
        this.numero = numero;
        this.saldo = saldo;
    }
    Conta.prototype.sacar = function (valor) {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        }
        return false;
    };
    Conta.prototype.transferir = function (destino, valor) {
        if (this.sacar(valor)) {
            destino.saldo += valor;
            return true;
        }
        return false;
    };
    Conta.prototype.consultarSaldo = function () {
        return this.saldo;
    };
    return Conta;
}());
// Testeeee
var conta1 = new Conta("1", 100);
var conta2 = new Conta("2", 50);
conta1.transferir(conta2, 30);
console.log(conta1.consultarSaldo());
console.log(conta2.consultarSaldo());
