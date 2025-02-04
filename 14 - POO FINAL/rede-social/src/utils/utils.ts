// src/utils.ts
import * as fs from 'fs';
import { RedeSocial } from '../classes/RedeSocial';
import { Perfil } from '../classes/Perfil';
import { Publicacao } from '../classes/Publicacao';
import { PublicacaoAvancada } from '../classes/PublicacaoAvancada';
import { Interacao } from '../classes/Interacao';

// Função para salvar os dados
export function salvarDados(redeSocial: RedeSocial): void {
    const perfisJson = JSON.stringify(redeSocial.listarPerfis(), null, 2);
    
    // Para salvar as publicações corretamente, usamos o método listarPublicacoes
    const publicacoesJson = JSON.stringify(redeSocial.listarPublicacoes(), null, 2);

    fs.writeFileSync('perfis.json', perfisJson);
    fs.writeFileSync('publicacoes.json', publicacoesJson);
}

// Função para carregar os dados
export function carregarDados(): RedeSocial {
    const redeSocial = new RedeSocial();
    
    // Carregar perfis
    if (fs.existsSync('perfis.json')) {
        const perfis = JSON.parse(fs.readFileSync('perfis.json', 'utf-8'));
        perfis.forEach((perfil: any) => {
            // Criando instância de Perfil com os dados carregados (sem o parâmetro 'status')
            const novoPerfil = new Perfil(perfil.id, perfil.apelido, perfil.foto, perfil.email);
            redeSocial.adicionarPerfil(novoPerfil);
        });
    }
    
    // Carregar publicações
    if (fs.existsSync('publicacoes.json')) {
        const publicacoes = JSON.parse(fs.readFileSync('publicacoes.json', 'utf-8'));
        publicacoes.forEach((publicacao: any) => {
            const perfil = redeSocial.buscarPerfil(publicacao.perfilId); // Buscando o perfil associado
            if (perfil) {
                // Verifica se a publicação é avançada e cria a publicação corretamente
                if (publicacao.hasOwnProperty('interacoes')) {
                    // Publicação avançada
                    const novaPublicacao = new PublicacaoAvancada(
                        publicacao.id,
                        publicacao.conteudo,
                        perfil
                    );
                    // Adicionar interações à publicação avançada
                    publicacao.interacoes.forEach((interacao: any) => {
                        const novaInteracao = new Interacao(
                            interacao.id,
                            interacao.tipo,
                            interacao.perfilAutor
                        );
                        novaPublicacao.adicionarInteracao(novaInteracao);
                    });
                    redeSocial.adicionarPublicacaoAvancada(novaPublicacao); // Adicionando publicação avançada
                } else {
                    // Publicação simples
                    const novaPublicacao = new Publicacao(publicacao.id, publicacao.conteudo, perfil);
                    redeSocial.adicionarPublicacao(novaPublicacao); // Adicionando publicação simples
                }
            }
        });
    }

    return redeSocial;
}
