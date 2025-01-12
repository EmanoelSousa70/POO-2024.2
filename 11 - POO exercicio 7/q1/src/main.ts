import { Carro } from './carro';
import { CarroEletrico } from './carroeletrico';

const meuCarro = new Carro("ABC-1234", 2020, "Sedan");
console.log(meuCarro.info());

const meuCarroEletrico = new CarroEletrico("DEF-5678", 2022, "Hatch", 300);
console.log(meuCarroEletrico.info());
