// src/classes/PublicacaoAvancada.ts
import { Publicacao } from './Publicacao';
import { Perfil } from './Perfil';  // Adicionei a importação de Perfil
import { Interacao } from './Interacao';

export class PublicacaoAvancada extends Publicacao {
    private interacoes: Interacao[] = [];

    constructor(id: string, conteudo: string, perfil: Perfil) {
        super(id, conteudo, perfil);
    }

    adicionarInteracao(interacao: Interacao): void {
        this.interacoes.push(interacao);
    }

    listarInteracoes(): Interacao[] {
        return this.interacoes;
    }

    getInteracoes(): Interacao[] {
        return this.interacoes;
    }
}
