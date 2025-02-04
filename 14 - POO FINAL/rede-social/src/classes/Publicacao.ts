// src/classes/Publicacao.ts
import { Perfil } from './Perfil';

export class Publicacao {
    private id: string;
    private conteudo: string;
    private dataHora: Date;
    private perfil: Perfil;

    constructor(id: string, conteudo: string, perfil: Perfil) {
        this.id = id;
        this.conteudo = conteudo;
        this.perfil = perfil;
        this.dataHora = new Date();
    }

    getId(): string {
        return this.id;
    }

    getConteudo(): string {
        return this.conteudo;
    }

    getDataHora(): Date {
        return this.dataHora;
    }

    getPerfil(): Perfil {
        return this.perfil;
    }
}
