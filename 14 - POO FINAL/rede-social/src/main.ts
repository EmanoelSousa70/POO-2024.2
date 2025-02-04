// src/main.ts
import * as readline from 'readline';
import { RedeSocial } from './classes/RedeSocial';
import { Perfil } from './classes/Perfil';
import { Publicacao } from './classes/Publicacao';
import { PublicacaoAvancada } from './classes/PublicacaoAvancada';
import { Interacao } from './classes/Interacao';
import { TipoInteracao } from './classes/enums/TipoInteracao';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const redeSocial = new RedeSocial();

function menu(): void {
    console.clear();
    console.log('Sistema de Rede Social');
    console.log('Escolha uma opção:');
    console.log('1 - Adicionar perfil');
    console.log('2 - Listar perfis');
    console.log('3 - Adicionar publicação');
    console.log('4 - Enviar solicitação de amizade');
    console.log('5 - Interagir com publicação');
    console.log('6 - Sair');
    
    rl.question('Escolha: ', (opcao) => {
        switch (opcao) {
            case '1':
                adicionarPerfil();
                break;
            case '2':
                listarPerfis();
                break;
            case '3':
                adicionarPublicacao();
                break;
            case '4':
                enviarSolicitacaoAmizade();
                break;
            case '5':
                interagirComPublicacao();
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Opção inválida!');
                menu();
                break;
        }
    });
}

function adicionarPerfil(): void {
    rl.question('Digite o ID do perfil: ', (id) => {
        rl.question('Digite o apelido: ', (apelido) => {
            rl.question('Digite a foto (emoji): ', (foto) => {
                rl.question('Digite o email: ', (email) => {
                    const perfil = new Perfil(id, apelido, foto, email);
                    try {
                        redeSocial.adicionarPerfil(perfil);
                        console.log('Perfil adicionado com sucesso!');
                    } catch (err) {
                        if (err instanceof Error) {
                            console.error('Erro:', err.message);
                        } else {
                            console.error('Erro desconhecido');
                        }
                    }
                    menu();
                });
            });
        });
    });
}

function listarPerfis(): void {
    const perfis = redeSocial.listarPerfis();
    if (perfis.length === 0) {
        console.log('Não há perfis cadastrados.');
    } else {
        console.log('Perfis cadastrados:');
        perfis.forEach((perfil, index) => {
            console.log(`${index + 1}. ${perfil.getApelido()} (${perfil.getId()})`);
        });
    }
    // delay antes de mostrar o menu
    rl.question('Pressione Enter para voltar ao menu...', () => {
        menu();
    });
}

function adicionarPublicacao(): void {
    rl.question('Digite o ID do perfil da publicação: ', (idPerfil) => {
        const perfil = redeSocial.buscarPerfil(idPerfil);
        if (!perfil) {
            console.log('Perfil não encontrado!');
            return menu();
        }
        rl.question('Digite o conteúdo da publicação: ', (conteudo) => {
            const publicacao = new Publicacao(idPerfil, conteudo, perfil);
            redeSocial.adicionarPublicacao(publicacao);
            console.log('Publicação adicionada com sucesso!');
            menu();
        });
    });
}

function enviarSolicitacaoAmizade(): void {
    rl.question('Digite o ID do perfil remetente: ', (idRemetente) => {
        const remetente = redeSocial.buscarPerfil(idRemetente);
        if (!remetente) {
            console.log('Perfil remetente não encontrado!');
            return menu();
        }
        rl.question('Digite o ID do perfil destinatário: ', (idDestinatario) => {
            const destinatario = redeSocial.buscarPerfil(idDestinatario);
            if (!destinatario) {
                console.log('Perfil destinatário não encontrado!');
                return menu();
            }
            redeSocial.enviarSolicitacaoAmizade(remetente, destinatario);
            console.log('Solicitação de amizade enviada com sucesso!');
            menu();
        });
    });
}

function interagirComPublicacao(): void {
    rl.question('Digite o ID da publicação para interagir: ', (idPublicacao) => {
        // Use o método listarPublicacoes() ao invés de acessar diretamente a propriedade privada
        const publicacao = redeSocial.listarPublicacoes().find(p => p.getId() === idPublicacao);
        
        if (!publicacao) {
            console.log('Publicação não encontrada!');
            return menu();
        }

        // Verifique se é uma instância de PublicacaoAvancada antes de permitir a interação
        if (!(publicacao instanceof PublicacaoAvancada)) {
            console.log('Somente publicações avançadas podem ter interações!');
            return menu();
        }

        rl.question('Escolha o tipo de interação (1: Curtir, 2: Não Curtir, 3: Riso, 4: Surpresa): ', (opcao) => {
            let tipo: TipoInteracao;
            switch (opcao) {
                case '1':
                    tipo = TipoInteracao.Curtir;
                    break;
                case '2':
                    tipo = TipoInteracao.NaoCurtir;
                    break;
                case '3':
                    tipo = TipoInteracao.Riso;
                    break;
                case '4':
                    tipo = TipoInteracao.Surpresa;
                    break;
                default:
                    console.log('Opção inválida!');
                    return menu();
            }
            rl.question('Digite o ID do perfil para interagir: ', (idPerfil) => {
                const perfil = redeSocial.buscarPerfil(idPerfil);
                if (!perfil) {
                    console.log('Perfil não encontrado!');
                    return menu();
                }
                const interacao = new Interacao(idPublicacao, tipo, perfil);
                try {
                    redeSocial.adicionarInteracao(publicacao, interacao);
                    console.log('Interação adicionada com sucesso!');
                } catch (err) {
                    if (err instanceof Error) {
                        console.error('Erro:', err.message);
                    } else {
                        console.error('Erro desconhecido');
                    }
                }
                menu();
            });
        });
    });
}

menu();
