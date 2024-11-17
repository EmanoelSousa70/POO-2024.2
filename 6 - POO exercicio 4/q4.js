// Classe Radio corrigida com um valor padrão no construtor
var Radio = /** @class */ (function () {
    function Radio(volume) {
        if (volume === void 0) { volume = 0; }
        this.volume = volume;
    }
    return Radio;
}());
var r = new Radio(); // Agora podemos instanciar sem argumentos
r.volume = 10;
console.log(r.volume); // Output: 10
