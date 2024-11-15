function formatarArray(arr) {
    var resultado = "";
    arr.forEach(function (item, index) {
        resultado += item;
        if (index < arr.length - 1)
            resultado += "-";
    });
    return resultado;
}
// Testessssss
console.log(formatarArray([1, 2, 3, 4])); // 1-2-3-4
console.log(formatarArray([10, 20])); // 10-20
