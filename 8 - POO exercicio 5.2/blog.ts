class Postagem {
    id: number;
    texto: string;
    quantidadeCurtidas: number;
  
    constructor(id: number, texto: string) {
      this.id = id;
      this.texto = texto;
      this.quantidadeCurtidas = 0; 
    }
  
    curtir(): void {
      this.quantidadeCurtidas++;
    }
  
    toString(): string {
      return `ID: ${this.id} - Texto: "${this.texto}" - Curtidas: ${this.quantidadeCurtidas}`;
    }
  }
  
  class Microblog {
    postagens: Postagem[];
  
    constructor() {
      this.postagens = [];
    }
  
    incluirPostagem(postagem: Postagem): void {
      this.postagens.push(postagem);
    }
  
    excluirPostagem(id: number): void {
      const index = this.postagens.findIndex((postagem) => postagem.id === id);
      if (index !== -1) {
        this.postagens.splice(index, 1);
      } else {
        console.log(`Postagem com ID ${id} não encontrada.`);
      }
    }
  
    postagemMaisCurtida(): Postagem | null {
      if (this.postagens.length === 0) {
        return null;
      }
      return this.postagens.reduce((maisCurtida, postagem) =>
        postagem.quantidadeCurtidas > maisCurtida.quantidadeCurtidas ? postagem : maisCurtida
      );
    }
  
    curtirPostagem(id: number): void {
      const postagem = this.postagens.find((postagem) => postagem.id === id);
      if (postagem) {
        postagem.curtir();
      } else {
        console.log(`Postagem com ID ${id} não encontrada.`);
      }
    }
  
    toString(): string {
      if (this.postagens.length === 0) {
        return "Nenhuma postagem disponível.";
      }
      return this.postagens.map((postagem) => postagem.toString()).join("\n");
    }
  }
  
  // testesss
  const microblog = new Microblog();
  
  const postagem1 = new Postagem(1, "Minha primeira postagem!");
  const postagem2 = new Postagem(2, "Amando TypeScript!");
  const postagem3 = new Postagem(3, "Microblog é divertido!");
  
  microblog.incluirPostagem(postagem1);
  microblog.incluirPostagem(postagem2);
  microblog.incluirPostagem(postagem3);
  
  microblog.curtirPostagem(2);
  microblog.curtirPostagem(2);
  microblog.curtirPostagem(3);
  
  console.log("Postagens:");
  console.log(microblog.toString());
  
  console.log("\nPostagem mais curtida:");
  const maisCurtida = microblog.postagemMaisCurtida();
  console.log(maisCurtida ? maisCurtida.toString() : "Nenhuma postagem encontrada.");
  
  microblog.excluirPostagem(1);
  console.log("\nApós exclusão:");
  console.log(microblog.toString());
  