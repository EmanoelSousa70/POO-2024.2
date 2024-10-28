class ControleDeAudio {
    volume: number = 2;

    
    aumentarVolume(): void {
        if (this.volume < 10) {
            this.volume += 1;
        }
    }

    diminuirVolume(): void {
        if (this.volume > 0) {
            this.volume -= 1;
        }
    }
   
    lerVolume(): number {
        return this.volume;
    }
}

const meuControle = new ControleDeAudio(); 

meuControle.aumentarVolume();
console.log("Volume após aumentar:", meuControle.lerVolume()); 

meuControle.diminuirVolume();
console.log("Volume após diminuir:", meuControle.lerVolume()); 
