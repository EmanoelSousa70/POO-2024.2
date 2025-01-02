var Postagem = /** @class */ (function () {
    function Postagem(id, texto) {
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = 0;
    }
    Postagem.prototype.curtir = function () {
        this.quantidadeCurtidas++;
    };
    Postagem.prototype.toString = function () {
        return "ID: ".concat(this.id, " - Texto: \"").concat(this.texto, "\" - Curtidas: ").concat(this.quantidadeCurtidas);
    };
    return Postagem;
}());
var Microblog = /** @class */ (function () {
    function Microblog() {
        this.postagens = [];
    }
    Microblog.prototype.incluirPostagem = function (postagem) {
        this.postagens.push(postagem);
    };
    Microblog.prototype.excluirPostagem = function (id) {
        var index = this.postagens.findIndex(function (postagem) { return postagem.id === id; });
        if (index !== -1) {
            this.postagens.splice(index, 1);
        }
        else {
            console.log("Postagem com ID ".concat(id, " n\u00E3o encontrada."));
        }
    };
    Microblog.prototype.postagemMaisCurtida = function () {
        if (this.postagens.length === 0) {
            return null;
        }
        return this.postagens.reduce(function (maisCurtida, postagem) {
            return postagem.quantidadeCurtidas > maisCurtida.quantidadeCurtidas ? postagem : maisCurtida;
        });
    };
    Microblog.prototype.curtirPostagem = function (id) {
        var postagem = this.postagens.find(function (postagem) { return postagem.id === id; });
        if (postagem) {
            postagem.curtir();
        }
        else {
            console.log("Postagem com ID ".concat(id, " n\u00E3o encontrada."));
        }
    };
    Microblog.prototype.toString = function () {
        if (this.postagens.length === 0) {
            return "Nenhuma postagem disponível.";
        }
        return this.postagens.map(function (postagem) { return postagem.toString(); }).join("\n");
    };
    return Microblog;
}());
// testesss
var microblog = new Microblog();
var postagem1 = new Postagem(1, "Minha primeira postagem!");
var postagem2 = new Postagem(2, "Amando TypeScript!");
var postagem3 = new Postagem(3, "Microblog é divertido!");
microblog.incluirPostagem(postagem1);
microblog.incluirPostagem(postagem2);
microblog.incluirPostagem(postagem3);
microblog.curtirPostagem(2);
microblog.curtirPostagem(2);
microblog.curtirPostagem(3);
console.log("Postagens:");
console.log(microblog.toString());
console.log("\nPostagem mais curtida:");
var maisCurtida = microblog.postagemMaisCurtida();
console.log(maisCurtida ? maisCurtida.toString() : "Nenhuma postagem encontrada.");
microblog.excluirPostagem(1);
console.log("\nApós exclusão:");
console.log(microblog.toString());
