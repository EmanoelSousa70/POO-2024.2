class Produto {
    private _id: number;
    private _descricao: string;
    private _quantidade: number;
    private _valorUnitario: number;

    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number) {
        this._id = id;
        this._descricao = descricao;
        this._quantidade = quantidade;
        this._valorUnitario = valorUnitario;
    }

    public get id(): number {
        return this._id;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public get quantidade(): number {
        return this._quantidade;
    }

    public get valorUnitario(): number {
        return this._valorUnitario;
    }

    public repor(quantidade: number): void {
        this._quantidade += quantidade;
    }

    public darBaixa(quantidade: number): void {
        if (this._quantidade >= quantidade) {
            this._quantidade -= quantidade;
        } else {
            throw new Error("Quantidade insuficiente em estoque.");
        }
    }
}

class ProdutoPerecivel extends Produto {
    private _dataValidade: Date;

    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number, dataValidade: Date) {
        super(id, descricao, quantidade, valorUnitario);
        this._dataValidade = dataValidade;
    }

    public get dataValidade(): Date {
        return this._dataValidade;
    }

    public estaValido(): boolean {
        return this._dataValidade > new Date();
    }

    public override repor(quantidade: number): void {
        if (this.estaValido()) {
            super.repor(quantidade);
        } else {
            throw new Error("Produto vencido, não é possível repor.");
        }
    }

    public override darBaixa(quantidade: number): void {
        if (this.estaValido()) {
            super.darBaixa(quantidade);
        } else {
            throw new Error("Produto vencido, não é possível dar baixa.");
        }
    }
}

class Estoque {
    private _produtos: Produto[];

    constructor() {
        this._produtos = [];
    }

    public incluir(produto: Produto): void {
        if (this.existe(produto.id, produto.descricao)) {
            throw new Error("Produto com mesmo ID ou descrição já existe no estoque.");
        }
        this._produtos.push(produto);
    }

    public existe(id: number, descricao: string): boolean {
        return this._produtos.some(prod => prod.id === id || prod.descricao === descricao);
    }

    public consultar(id: number): Produto | undefined {
        return this._produtos.find(prod => prod.id === id);
    }

    public excluir(id: number): void {
        const index = this._produtos.findIndex(prod => prod.id === id);
        if (index !== -1) {
            this._produtos.splice(index, 1);
        } else {
            throw new Error("Produto não encontrado.");
        }
    }

    public repor(id: number, quantidade: number): void {
        const produto = this.consultar(id);
        if (produto) {
            produto.repor(quantidade);
        } else {
            throw new Error("Produto não encontrado.");
        }
    }

    public darBaixa(id: number, quantidade: number): void {
        const produto = this.consultar(id);
        if (produto) {
            produto.darBaixa(quantidade);
        } else {
            throw new Error("Produto não encontrado.");
        }
    }

    public listarPereciveisVencidos(): ProdutoPerecivel[] {
        return this._produtos
            .filter(prod => prod instanceof ProdutoPerecivel && !(prod as ProdutoPerecivel).estaValido())
            .map(prod => prod as ProdutoPerecivel);
    }
}

export { Produto, ProdutoPerecivel, Estoque };