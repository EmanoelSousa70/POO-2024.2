// src/classes/Perfil.ts
import { Publicacao } from './Publicacao';

export class Perfil {
    private id: string;
    private apelido: string;
    private foto: string;
    private email: string;
    private status: 'ativo' | 'inativo';
    private amigos: Perfil[] = [];
    private postagens: Publicacao[] = [];

    constructor(id: string, apelido: string, foto: string, email: string) {
        this.id = id;
        this.apelido = apelido;
        this.foto = foto;
        this.email = email;
        this.status = 'ativo';
    }

    getId(): string {
        return this.id;
    }

    getApelido(): string {
        return this.apelido;
    }

    getStatus(): string {
        return this.status;
    }

    getEmail(): string {
        return this.email;
    }

    ativar(): void {
        this.status = 'ativo';
    }

    desativar(): void {
        this.status = 'inativo';
    }

    adicionarAmigo(amigo: Perfil): void {
        if (!this.amigos.includes(amigo)) {
            this.amigos.push(amigo);
        }
    }

    removerAmigo(amigo: Perfil): void {
        this.amigos = this.amigos.filter(a => a !== amigo);
    }

    adicionarPublicacao(publicacao: Publicacao): void {
        this.postagens.push(publicacao);
    }

    listarAmigos(): Perfil[] {
        return this.amigos;
    }

    listarPostagens(): Publicacao[] {
        return this.postagens;
    }
}
