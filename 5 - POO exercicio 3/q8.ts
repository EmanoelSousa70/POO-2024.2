const numeros = [1, 2, 3, 4, 5];

// Dobra os elementos do array com Map
const dobrados = numeros.map((numero) => numero * 2);
console.log(dobrados);  // [2, 4, 6, 8, 10]

// Soma dos elementos com reduce
const somaTotal = numeros.reduce((acumulado, numero) => acumulado + numero, 0);
console.log(somaTotal);  // 15