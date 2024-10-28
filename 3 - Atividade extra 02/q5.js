var ControleDeAudio = /** @class */ (function () {
    function ControleDeAudio() {
        this.volume = 2;
    }
    ControleDeAudio.prototype.aumentarVolume = function () {
        if (this.volume < 10) {
            this.volume += 1;
        }
    };
    ControleDeAudio.prototype.diminuirVolume = function () {
        if (this.volume > 0) {
            this.volume -= 1;
        }
    };
    ControleDeAudio.prototype.lerVolume = function () {
        return this.volume;
    };
    return ControleDeAudio;
}());
var meuControle = new ControleDeAudio();
meuControle.aumentarVolume();
console.log("Volume após aumentar:", meuControle.lerVolume());
meuControle.diminuirVolume();
console.log("Volume após diminuir:", meuControle.lerVolume());
