function exibir() {
    var itens = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        itens[_i] = arguments[_i];
    }
    itens.forEach(function (item) {
        console.log(item);
    });
}
// Testesssssss
exibir("a", "b"); // a, b
exibir("a", "b", "c"); // a, b, c
exibir("a", "b", "c", "d"); // a, b, c, d
