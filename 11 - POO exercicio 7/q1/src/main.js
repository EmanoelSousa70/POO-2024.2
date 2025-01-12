"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var carro_1 = require("./carro");
var carroeletrico_1 = require("./carroeletrico");
var meuCarro = new carro_1.Carro("ABC-1234", 2020, "Sedan");
console.log(meuCarro.info());
var meuCarroEletrico = new carroeletrico_1.CarroEletrico("DEF-5678", 2022, "Hatch", 300);
console.log(meuCarroEletrico.info());
