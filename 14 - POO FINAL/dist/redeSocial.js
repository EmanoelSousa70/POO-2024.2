"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Enumeração para tipos de interação
var TipoInteracao;
(function (TipoInteracao) {
    TipoInteracao["CURTIR"] = "\uD83D\uDC4D";
    TipoInteracao["NAO_CURTIR"] = "\uD83D\uDC4E";
    TipoInteracao["RISO"] = "\uD83D\uDE02";
    TipoInteracao["SURPRESA"] = "\uD83D\uDE2E";
})(TipoInteracao || (TipoInteracao = {}));
// Exceções personalizadas
class PerfilJaCadastradoError extends Error {
    constructor(message) {
        super(message);
        this.name = "PerfilJaCadastradoError";
    }
}
class PerfilNaoAutorizadoError extends Error {
    constructor(message) {
        super(message);
        this.name = "PerfilNaoAutorizadoError";
    }
}
class PerfilInativoError extends Error {
    constructor(message) {
        super(message);
        this.name = "PerfilInativoError";
    }
}
class InteracaoDuplicadaError extends Error {
    constructor(message) {
        super(message);
        this.name = "InteracaoDuplicadaError";
    }
}
class AmizadeJaExistenteError extends Error {
    constructor(message) {
        super(message);
        this.name = "AmizadeJaExistenteError";
    }
}
class ValorInvalidoException extends Error {
    constructor(message) {
        super(message);
        this.name = "ValorInvalidoException";
    }
}
// Classe Perfil
class Perfil {
    constructor(id, apelido, foto, email) {
        this.id = id;
        this.apelido = apelido;
        this.foto = foto;
        this.email = email;
        this.status = true; // Ativo por padrão
        this.amigos = [];
        this.postagens = [];
    }
    adicionarAmigo(amigo) {
        if (this.amigos.includes(amigo)) {
            throw new AmizadeJaExistenteError("Amizade já existe!");
        }
        this.amigos.push(amigo);
    }
    removerAmigo(amigo) {
        const index = this.amigos.indexOf(amigo);
        if (index !== -1) {
            this.amigos.splice(index, 1);
        }
    }
    adicionarPublicacao(publicacao) {
        if (!this.status) {
            throw new PerfilInativoError("Perfil inativo não pode publicar!");
        }
        this.postagens.push(publicacao);
    }
    listarAmigos() {
        return this.amigos.map(amigo => amigo.apelido);
    }
    listarPostagens() {
        return this.postagens.map(pub => pub.conteudo);
    }
    ativarDesativar(status) {
        this.status = status;
    }
}
// Classe PerfilAvançado
class PerfilAvancado extends Perfil {
    habilitarDesabilitarPerfil(perfil, status) {
        if (!(this instanceof PerfilAvancado)) {
            throw new PerfilNaoAutorizadoError("Apenas perfis avançados podem habilitar/desabilitar outros perfis!");
        }
        perfil.ativarDesativar(status);
    }
}
// Classe Publicacao
class Publicacao {
    constructor(id, conteudo, perfil) {
        this.id = id;
        this.conteudo = conteudo;
        this.dataHora = new Date();
        this.perfil = perfil;
    }
}
// Classe PublicacaoAvancada
class PublicacaoAvancada extends Publicacao {
    constructor(id, conteudo, perfil) {
        super(id, conteudo, perfil);
        this.interacoes = [];
    }
    adicionarInteracao(interacao) {
        if (this.interacoes.some(i => i.perfil === interacao.perfil)) {
            throw new InteracaoDuplicadaError("Usuário já interagiu com esta publicação!");
        }
        this.interacoes.push(interacao);
    }
    listarInteracoes() {
        return this.interacoes.map(i => `${i.perfil.apelido} ${i.tipo}`);
    }
}
// Classe Interacao
class Interacao {
    constructor(id, tipo, perfil) {
        this.id = id;
        this.tipo = tipo;
        this.perfil = perfil;
    }
}
// Classe RedeSocial
class RedeSocial {
    constructor() {
        this.perfis = [];
        this.publicacoes = [];
        this.solicitacoesAmizade = new Map();
    }
    adicionarPerfil(perfil) {
        if (this.perfis.some(p => p.id === perfil.id || p.email === perfil.email)) {
            throw new PerfilJaCadastradoError("Perfil já cadastrado!");
        }
        this.perfis.push(perfil);
    }
    buscarPerfilPorEmail(email) {
        return this.perfis.find(p => p.email === email);
    }
    buscarPerfilPorApelido(apelido) {
        return this.perfis.find(p => p.apelido === apelido);
    }
    buscarPerfilPorId(id) {
        return this.perfis.find(p => p.id === id);
    }
    listarTodosPerfis() {
        return this.perfis;
    }
    adicionarPublicacao(publicacao) {
        if (!publicacao.perfil.status) {
            throw new PerfilInativoError("Perfil inativo não pode publicar!");
        }
        this.publicacoes.push(publicacao);
    }
    listarPublicacoes() {
        return this.publicacoes;
    }
    enviarSolicitacaoAmizade(remetente, destinatario) {
        if (!remetente.status || !destinatario.status) {
            throw new PerfilInativoError("Perfis desativados não podem enviar ou receber solicitações de amizade!");
        }
        if (remetente.amigos.includes(destinatario)) {
            throw new AmizadeJaExistenteError("Amizade já existe!");
        }
        this.solicitacoesAmizade.set(remetente, destinatario);
    }
    aceitarSolicitacaoAmizade(remetente, destinatario) {
        if (!remetente.status || !destinatario.status) {
            throw new PerfilInativoError("Perfis desativados não podem aceitar solicitações de amizade!");
        }
        if (this.solicitacoesAmizade.get(remetente) === destinatario) {
            remetente.adicionarAmigo(destinatario);
            destinatario.adicionarAmigo(remetente);
            this.solicitacoesAmizade.delete(remetente);
        }
    }
    recusarSolicitacaoAmizade(remetente, destinatario) {
        if (!remetente.status || !destinatario.status) {
            throw new PerfilInativoError("Perfis desativados não podem recusar solicitações de amizade!");
        }
        if (this.solicitacoesAmizade.get(remetente) === destinatario) {
            this.solicitacoesAmizade.delete(remetente);
        }
    }
    adicionarInteracao(publicacao, interacao) {
        if (!interacao.perfil.status) {
            throw new PerfilInativoError("Perfil desativado não pode interagir com publicações!");
        }
        publicacao.adicionarInteracao(interacao);
    }
}
// COMEÇO DA INTERATIVADE PARA O TERMINAL
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const redeSocial = new RedeSocial();
function menuPrincipal() {
    console.log("\n--- Rede Social ---");
    console.log("1. Adicionar Perfil");
    console.log("2. Buscar Perfil");
    console.log("3. Listar Perfis");
    console.log("4. Adicionar Publicação");
    console.log("5. Enviar Solicitação de Amizade");
    console.log("6. Aceitar Solicitação de Amizade");
    console.log("7. Recusar Solicitação de Amizade");
    console.log("8. Listar Publicações");
    console.log("9. Interagir com Publicação");
    console.log("10. Menu Perfil Avançado");
    console.log("0. Sair");
    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case '1':
                adicionarPerfil();
                break;
            case '2':
                buscarPerfil();
                break;
            case '3':
                listarPerfis();
                break;
            case '4':
                adicionarPublicacao();
                break;
            case '5':
                enviarSolicitacaoAmizade();
                break;
            case '6':
                aceitarSolicitacaoAmizade();
                break;
            case '7':
                recusarSolicitacaoAmizade();
                break;
            case '8':
                listarPublicacoes();
                break;
            case '9':
                interagirPublicacao();
                break;
            case '10':
                menuPerfilAvancado();
                break;
            case '0':
                rl.close(); // usar a funçao para sair do programa  
                break;
            default:
                console.log("Opção inválida!");
                menuPrincipal();
                break;
        }
    });
}
// Funções auxiliares para a interface interativa
function adicionarPerfil() {
    rl.question("ID do perfil: ", (id) => {
        rl.question("Apelido: ", (apelido) => {
            rl.question("Foto (emoji): ", (foto) => {
                rl.question("Email: ", (email) => {
                    rl.question("É um perfil avançado? (S/N): ", (resposta) => {
                        try {
                            let perfil;
                            if (resposta.toUpperCase() === 'S') {
                                perfil = new PerfilAvancado(id, apelido, foto, email);
                            }
                            else {
                                perfil = new Perfil(id, apelido, foto, email);
                            }
                            redeSocial.adicionarPerfil(perfil);
                            console.log("Perfil adicionado com sucesso!");
                        }
                        catch (error) {
                            if (error instanceof Error) {
                                console.error(error.message);
                            }
                            else {
                                console.error("Erro desconhecido");
                            }
                        }
                        menuPrincipal();
                    });
                });
            });
        });
    });
}
function buscarPerfil() {
    rl.question("Buscar por (1 - Email, 2 - Apelido, 3 - ID): ", (opcao) => {
        switch (opcao) {
            case '1':
                rl.question("Email: ", (email) => {
                    const perfil = redeSocial.buscarPerfilPorEmail(email);
                    if (perfil) {
                        console.log(`Perfil encontrado: ${perfil.apelido}`);
                    }
                    else {
                        console.log("Perfil não encontrado!");
                    }
                    menuPrincipal();
                });
                break;
            case '2':
                rl.question("Apelido: ", (apelido) => {
                    const perfil = redeSocial.buscarPerfilPorApelido(apelido);
                    if (perfil) {
                        console.log(`Perfil encontrado: ${perfil.apelido}`);
                    }
                    else {
                        console.log("Perfil não encontrado!");
                    }
                    menuPrincipal();
                });
                break;
            case '3':
                rl.question("ID: ", (id) => {
                    const perfil = redeSocial.buscarPerfilPorId(id);
                    if (perfil) {
                        console.log(`Perfil encontrado: ${perfil.apelido}`);
                    }
                    else {
                        console.log("Perfil não encontrado!");
                    }
                    menuPrincipal();
                });
                break;
            default:
                console.log("Opção inválida!");
                menuPrincipal();
                break;
        }
    });
}
function listarPerfis() {
    const perfis = redeSocial.listarTodosPerfis();
    perfis.forEach(p => console.log(`ID: ${p.id}, Apelido: ${p.apelido}, Email: ${p.email}, Status: ${p.status ? "Ativo" : "Inativo"}`));
    menuPrincipal();
}
function adicionarPublicacao() {
    rl.question("ID da publicação: ", (id) => {
        rl.question("Conteúdo: ", (conteudo) => {
            rl.question("ID do perfil: ", (perfilId) => {
                const perfil = redeSocial.buscarPerfilPorId(perfilId);
                if (!perfil) {
                    console.log("Perfil não encontrado!");
                    return menuPrincipal();
                }
                try {
                    if (!perfil.status) {
                        throw new PerfilInativoError("Perfil inativo não pode publicar!");
                    }
                    rl.question("É uma publicação avançada? (S/N): ", (resposta) => {
                        try {
                            let publicacao;
                            if (resposta.toUpperCase() === 'S') {
                                publicacao = new PublicacaoAvancada(id, conteudo, perfil);
                            }
                            else {
                                publicacao = new Publicacao(id, conteudo, perfil);
                            }
                            redeSocial.adicionarPublicacao(publicacao);
                            console.log("Publicação adicionada com sucesso!");
                        }
                        catch (error) {
                            if (error instanceof Error) {
                                console.error(error.message);
                            }
                            else {
                                console.error("Erro desconhecido ao adicionar publicação.");
                            }
                        }
                        menuPrincipal();
                    });
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                    else {
                        console.error("Erro desconhecido ao verificar o status do perfil.");
                    }
                    menuPrincipal();
                }
            });
        });
    });
}
function enviarSolicitacaoAmizade() {
    rl.question("ID do remetente: ", (remetenteId) => {
        const remetente = redeSocial.buscarPerfilPorId(remetenteId);
        if (remetente) {
            if (!remetente.status) {
                console.log("Erro: Perfil desativado não pode enviar solicitações de amizade!");
                return menuPrincipal();
            }
            rl.question("ID do destinatário: ", (destinatarioId) => {
                const destinatario = redeSocial.buscarPerfilPorId(destinatarioId);
                if (destinatario) {
                    if (!destinatario.status) {
                        console.log("Erro: Perfil desativado não pode receber solicitações de amizade!");
                        return menuPrincipal();
                    }
                    try {
                        redeSocial.enviarSolicitacaoAmizade(remetente, destinatario);
                        console.log(`Solicitação de amizade enviada para ${destinatario.apelido}`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            console.error(error.message);
                        }
                        else {
                            console.error("Erro desconhecido ao enviar a solicitação de amizade.");
                        }
                    }
                }
                else {
                    console.log("Destinatário não encontrado!");
                }
                menuPrincipal();
            });
        }
        else {
            console.log("Remetente não encontrado!");
            menuPrincipal();
        }
    });
}
function aceitarSolicitacaoAmizade() {
    rl.question("ID do remetente: ", (remetenteId) => {
        const remetente = redeSocial.buscarPerfilPorId(remetenteId);
        if (remetente) {
            if (!remetente.status) {
                console.log("Erro: Perfil desativado não pode aceitar solicitações de amizade!");
                return menuPrincipal();
            }
            rl.question("ID do destinatário: ", (destinatarioId) => {
                const destinatario = redeSocial.buscarPerfilPorId(destinatarioId);
                if (destinatario) {
                    if (!destinatario.status) {
                        console.log("Erro: Perfil desativado não pode aceitar solicitações de amizade!");
                        return menuPrincipal();
                    }
                    rl.question(`Você deseja aceitar a solicitação de amizade de ${remetente.apelido}? (S/N): `, (resposta) => {
                        if (resposta.toUpperCase() === 'S') {
                            try {
                                redeSocial.aceitarSolicitacaoAmizade(remetente, destinatario);
                                console.log("Solicitação de amizade aceita!");
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.error(error.message);
                                }
                                else {
                                    console.error("Erro desconhecido ao aceitar a solicitação de amizade.");
                                }
                            }
                        }
                        else {
                            console.log("Solicitação de amizade não aceita.");
                        }
                        menuPrincipal();
                    });
                }
                else {
                    console.log("Destinatário não encontrado!");
                    menuPrincipal();
                }
            });
        }
        else {
            console.log("Remetente não encontrado!");
            menuPrincipal();
        }
    });
}
function recusarSolicitacaoAmizade() {
    rl.question("ID do remetente: ", (remetenteId) => {
        const remetente = redeSocial.buscarPerfilPorId(remetenteId);
        if (remetente) {
            if (!remetente.status) {
                console.log("Erro: Perfil desativado não pode recusar solicitações de amizade!");
                return menuPrincipal();
            }
            rl.question("ID do destinatário: ", (destinatarioId) => {
                const destinatario = redeSocial.buscarPerfilPorId(destinatarioId);
                if (destinatario) {
                    if (!destinatario.status) {
                        console.log("Erro: Perfil desativado não pode recusar solicitações de amizade!");
                        return menuPrincipal();
                    }
                    rl.question(`Você deseja recusar a solicitação de amizade de ${remetente.apelido}? (S/N): `, (resposta) => {
                        if (resposta.toUpperCase() === 'S') {
                            try {
                                redeSocial.recusarSolicitacaoAmizade(remetente, destinatario);
                                console.log("Solicitação de amizade recusada!");
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.error(error.message);
                                }
                                else {
                                    console.error("Erro desconhecido ao recusar a solicitação de amizade.");
                                }
                            }
                        }
                        else {
                            console.log("Solicitação de amizade não recusada.");
                        }
                        menuPrincipal();
                    });
                }
                else {
                    console.log("Destinatário não encontrado!");
                    menuPrincipal();
                }
            });
        }
        else {
            console.log("Remetente não encontrado!");
            menuPrincipal();
        }
    });
}
function listarPublicacoes() {
    const publicacoes = redeSocial.listarPublicacoes();
    publicacoes.forEach(pub => {
        console.log(`ID: ${pub.id}, Conteúdo: ${pub.conteudo}, Autor: ${pub.perfil.apelido}`);
        if (pub instanceof PublicacaoAvancada) {
            console.log(`Interações: ${pub.listarInteracoes().join(", ")}`);
        }
    });
    menuPrincipal();
}
function interagirPublicacao() {
    const publicacoesAvancadas = redeSocial.listarPublicacoes().filter(pub => pub instanceof PublicacaoAvancada);
    if (publicacoesAvancadas.length === 0) {
        console.log("Nenhuma publicação avançada disponível para interação.");
        menuPrincipal();
        return;
    }
    console.log("Publicações avançadas disponíveis:");
    publicacoesAvancadas.forEach(pub => {
        console.log(`ID: ${pub.id}, Conteúdo: ${pub.conteudo}, Autor: ${pub.perfil.apelido}`);
    });
    rl.question("ID da publicação: ", (publicacaoId) => {
        const publicacao = publicacoesAvancadas.find(pub => pub.id === publicacaoId);
        if (publicacao) {
            rl.question("ID do perfil que vai interagir: ", (perfilId) => {
                const perfil = redeSocial.buscarPerfilPorId(perfilId);
                if (perfil) {
                    if (!perfil.status) {
                        console.log("Erro: Perfil desativado não pode interagir com publicações!");
                        return menuPrincipal();
                    }
                    rl.question("Tipo de interação (CURTIR, NAO_CURTIR, RISO, SURPRESA): ", (tipo) => {
                        try {
                            // Converte a entrada para maiúsculas
                            const tipoInteracao = tipo.toUpperCase();
                            // Verifica se o tipo de interação é válido
                            if (!(tipoInteracao in TipoInteracao)) {
                                throw new ValorInvalidoException("Tipo de interação inválido!");
                            }
                            const interacao = new Interacao(Math.random().toString(36).substring(7), TipoInteracao[tipoInteracao], perfil);
                            redeSocial.adicionarInteracao(publicacao, interacao);
                            console.log("Interação adicionada com sucesso!");
                        }
                        catch (error) {
                            if (error instanceof Error) {
                                console.error(error.message);
                            }
                            else {
                                console.error("Erro desconhecido ao interagir com a publicação.");
                            }
                        }
                        menuPrincipal();
                    });
                }
                else {
                    console.log("Perfil não encontrado!");
                    menuPrincipal();
                }
            });
        }
        else {
            console.log("Publicação não encontrada!");
            menuPrincipal();
        }
    });
}
function menuPerfilAvancado() {
    console.log("\n--- Menu Perfil Avançado ---");
    console.log("1. Habilitar Perfil");
    console.log("2. Desabilitar Perfil");
    console.log("0. Voltar ao Menu Principal");
    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case '1':
                habilitarPerfil();
                break;
            case '2':
                desabilitarPerfil();
                break;
            case '0':
                menuPrincipal();
                break;
            default:
                console.log("Opção inválida!");
                menuPerfilAvancado();
                break;
        }
    });
}
function habilitarPerfil() {
    rl.question("ID do perfil avançado: ", (perfilAvancadoId) => {
        const perfilAvancado = redeSocial.buscarPerfilPorId(perfilAvancadoId);
        if (perfilAvancado && perfilAvancado instanceof PerfilAvancado) {
            rl.question("ID do perfil a ser habilitado: ", (perfilId) => {
                const perfil = redeSocial.buscarPerfilPorId(perfilId);
                if (perfil) {
                    rl.question(`Você deseja habilitar o perfil ${perfil.apelido}? (S/N): `, (resposta) => {
                        if (resposta.toUpperCase() === 'S') {
                            try {
                                perfilAvancado.habilitarDesabilitarPerfil(perfil, true);
                                console.log("Perfil habilitado com sucesso!");
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.error(error.message);
                                }
                                else {
                                    console.error("Erro desconhecido ao tentar habilitar o perfil.");
                                }
                            }
                        }
                        else {
                            console.log("Operação cancelada.");
                        }
                        menuPerfilAvancado();
                    });
                }
                else {
                    console.log("Perfil não encontrado!");
                    menuPerfilAvancado();
                }
            });
        }
        else {
            console.log("Perfil avançado não encontrado ou não tem permissão!");
            menuPerfilAvancado();
        }
    });
}
function desabilitarPerfil() {
    rl.question("ID do perfil avançado: ", (perfilAvancadoId) => {
        const perfilAvancado = redeSocial.buscarPerfilPorId(perfilAvancadoId);
        if (perfilAvancado && perfilAvancado instanceof PerfilAvancado) {
            rl.question("ID do perfil a ser desabilitado: ", (perfilId) => {
                const perfil = redeSocial.buscarPerfilPorId(perfilId);
                if (perfil) {
                    rl.question(`Você deseja desabilitar o perfil ${perfil.apelido}? (S/N): `, (resposta) => {
                        if (resposta.toUpperCase() === 'S') {
                            try {
                                perfilAvancado.habilitarDesabilitarPerfil(perfil, false);
                                console.log("Perfil desabilitado com sucesso!");
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.error(error.message);
                                }
                                else {
                                    console.error("Erro desconhecido ao tentar desabilitar o perfil.");
                                }
                            }
                        }
                        else {
                            console.log("Operação cancelada.");
                        }
                        menuPerfilAvancado();
                    });
                }
                else {
                    console.log("Perfil não encontrado!");
                    menuPerfilAvancado();
                }
            });
        }
        else {
            console.log("Perfil avançado não encontrado ou não tem permissão!");
            menuPerfilAvancado();
        }
    });
}
// Iniciar a interface
menuPrincipal();
