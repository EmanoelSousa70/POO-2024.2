function exibir(...itens: string[]): void {
    itens.forEach(item => {
        console.log(item);
    });
}

// Testesssssss
exibir("a", "b");              // a, b
exibir("a", "b", "c");          // a, b, c
exibir("a", "b", "c", "d");     // a, b, c, d