// src/classes/RedeSocial.ts
import { Perfil } from './Perfil';
import { Publicacao } from './Publicacao';
import { PublicacaoAvancada } from './PublicacaoAvancada';
import { Interacao } from './Interacao';
import { TipoInteracao } from './enums/TipoInteracao';

export class RedeSocial {
    private perfis: Perfil[] = [];
    private publicacoes: Publicacao[] = [];
    private solicitacoesAmizade: Map<Perfil, Perfil> = new Map();

    // Adiciona um novo perfil à rede social
    adicionarPerfil(perfil: Perfil): void {
        if (this.perfis.some(p => p.getId() === perfil.getId() || p.getEmail() === perfil.getEmail())) {
            throw new Error('Perfil já cadastrado');
        }
        this.perfis.push(perfil);
    }

    // Busca perfil por ID
    buscarPerfil(id: string): Perfil | undefined {
        return this.perfis.find(p => p.getId() === id);
    }

    // Busca perfil por e-mail
    buscarPerfilPorEmail(email: string): Perfil | undefined {
        return this.perfis.find(p => p.getEmail() === email);
    }

    // Lista todos os perfis cadastrados
    listarPerfis(): Perfil[] {
        return this.perfis;
    }

    // Adiciona uma nova publicação simples à rede social
    adicionarPublicacao(publicacao: Publicacao): void {
        this.publicacoes.push(publicacao);
    }

    // Adiciona uma nova publicação avançada à rede social
    adicionarPublicacaoAvancada(publicacao: PublicacaoAvancada): void {
        this.publicacoes.push(publicacao);
    }

    // Lista todas as publicações ordenadas pelo ID em ordem decrescente
    listarPublicacoes(): Publicacao[] {
        return this.publicacoes.sort((a, b) => b.getId().localeCompare(a.getId()));
    }

    // Envia uma solicitação de amizade entre dois perfis
    enviarSolicitacaoAmizade(remetente: Perfil, destinatario: Perfil): void {
        if (this.solicitacoesAmizade.has(remetente)) {
            throw new Error('Solicitação já pendente');
        }
        this.solicitacoesAmizade.set(remetente, destinatario);
    }

    // Aceita uma solicitação de amizade
    aceitarSolicitacaoAmizade(remetente: Perfil): void {
        const destinatario = this.solicitacoesAmizade.get(remetente);
        if (destinatario) {
            remetente.adicionarAmigo(destinatario);
            destinatario.adicionarAmigo(remetente);
            this.solicitacoesAmizade.delete(remetente);
        }
    }

    // Recusa uma solicitação de amizade
    recusarSolicitacaoAmizade(remetente: Perfil): void {
        this.solicitacoesAmizade.delete(remetente);
    }

    // Adiciona uma interação a uma publicação avançada
    adicionarInteracao(publicacao: PublicacaoAvancada, interacao: Interacao): void {
        if (publicacao instanceof PublicacaoAvancada) {
            // Verifica se o perfil já interagiu com esta publicação
            if (publicacao.getInteracoes().some(i => i.getPerfil().getId() === interacao.getPerfil().getId())) {
                throw new Error('Interação já realizada');
            }
            publicacao.adicionarInteracao(interacao);
        }
    }
}
