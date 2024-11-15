var numeros = [1, 2, 3, 4, 5];
// Dobra os elementos do array com Map
var dobrados = numeros.map(function (numero) { return numero * 2; });
console.log(dobrados); // [2, 4, 6, 8, 10]
// Soma dos elementos com reduce
var somaTotal = numeros.reduce(function (acumulado, numero) { return acumulado + numero; }, 0);
console.log(somaTotal); // 15
