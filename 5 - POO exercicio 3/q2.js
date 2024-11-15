function saudar(nome, pronome) {
    if (pronome === void 0) { pronome = "Sr"; }
    console.log("".concat(pronome, ". ").concat(nome));
}
// Testessss
saudar("João"); // Sr. João
saudar("Maria", "Sra"); // Sra. Maria
saudar("Carlos", "Dr"); // Dr. Carlo
