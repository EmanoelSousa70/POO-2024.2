function soma(x: number, y?: any): number {
    return x + y;
}

// Testessssss
console.log(soma(1, 2));        // 3
console.log(soma(1, "2"));      // "12" (concatenação)
console.log(soma(1));           // NaN (undefined somado)