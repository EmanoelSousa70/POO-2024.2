import { Produto, ProdutoPerecivel, Estoque } from './estoque_produtos';

// Testes
const estoque = new Estoque();

try {
    // Criando produtos
    const produto1 = new Produto(1, "Arroz", 100, 5.0);
    const produto2 = new ProdutoPerecivel(2, "Leite", 50, 3.5, new Date("2025-01-01"));
    const produto3 = new ProdutoPerecivel(3, "Iogurte", 20, 4.0, new Date("2024-01-15"));

    // Adicionando produtos ao estoque
    estoque.incluir(produto1);
    estoque.incluir(produto2);
    estoque.incluir(produto3);

    console.log("Produtos adicionados ao estoque com sucesso.");

    // Tentativa de adicionar produto duplicado
    try {
        const produtoDuplicado = new Produto(1, "Feijão", 30, 6.0);
        estoque.incluir(produtoDuplicado);
    } catch (error) {
        console.error(error.message);
    }

    // Repondo quantidade
    estoque.repor(1, 50);
    console.log("Quantidade do produto 1 após reposição:", estoque.consultar(1)?.quantidade);

    // Dando baixa na quantidade
    estoque.darBaixa(1, 20);
    console.log("Quantidade do produto 1 após baixa:", estoque.consultar(1)?.quantidade);

    // Tentando dar baixa em um produto perecível vencido
    try {
        estoque.darBaixa(3, 5);
    } catch (error) {
        console.error(error.message);
    }

    // Listando perecíveis vencidos
    const vencidos = estoque.listarPereciveisVencidos();
    console.log("Produtos perecíveis vencidos:", vencidos.map(prod => prod.descricao));

    // Excluindo um produto
    estoque.excluir(1);
    console.log("Produtos restantes após exclusão:", estoque);
} catch (error) {
    console.error("Erro durante os testes:", error.message);
}
