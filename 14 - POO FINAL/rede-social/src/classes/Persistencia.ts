// src/classes/Persistencia.ts
import { Perfil } from './Perfil';
import { Publicacao } from './Publicacao';

import * as fs from 'fs';

export class Persistencia {
    static salvarPerfis(perfis: Perfil[]): void {
        fs.writeFileSync('perfis.json', JSON.stringify(perfis, null, 2));
    }

    static carregarPerfis(): Perfil[] {
        if (fs.existsSync('perfis.json')) {
            return JSON.parse(fs.readFileSync('perfis.json', 'utf8'));
        }
        return [];
    }

    static salvarPublicacoes(publicacoes: Publicacao[]): void {
        fs.writeFileSync('publicacoes.json', JSON.stringify(publicacoes, null, 2));
    }

    static carregarPublicacoes(): Publicacao[] {
        if (fs.existsSync('publicacoes.json')) {
            return JSON.parse(fs.readFileSync('publicacoes.json', 'utf8'));
        }
        return [];
    }
}
