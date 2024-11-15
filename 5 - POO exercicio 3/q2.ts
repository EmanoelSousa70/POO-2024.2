function saudar(nome: string, pronome: string = "Sr"): void {
    console.log(`${pronome}. ${nome}`);
}

// Testessss
saudar("João");         // Sr. João
saudar("Maria", "Sra"); // Sra. Maria
saudar("Carlos", "Dr"); // Dr. Carlo