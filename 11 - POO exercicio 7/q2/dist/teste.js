"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculadora_1 = require("./calculadora");
var calculadora = new calculadora_1.Calculadora(5, 10);
var resultado = calculadora.somar();
console.log("Resultado da soma: ".concat(resultado));
