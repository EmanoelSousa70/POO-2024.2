// src/classes/Interacao.ts
import { Perfil } from './Perfil';
import { TipoInteracao } from './enums/TipoInteracao';

export class Interacao {
    private id: string;
    private tipo: TipoInteracao;
    private perfil: Perfil;

    constructor(id: string, tipo: TipoInteracao, perfil: Perfil) {
        this.id = id;
        this.tipo = tipo;
        this.perfil = perfil;
    }

    getId(): string {
        return this.id;
    }

    getTipo(): TipoInteracao {
        return this.tipo;
    }

    getPerfil(): Perfil {
        return this.perfil;
    }
}
