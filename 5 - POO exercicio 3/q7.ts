const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
 
const numerosPares = array.filter((numero) => numero % 2 === 0);
console.log(numerosPares);  // [2, 4, 6, 8, 10, 12, 14]