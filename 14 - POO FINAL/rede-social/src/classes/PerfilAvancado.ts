// src/classes/PerfilAvancado.ts
// src/classes/PerfilAvancado.ts
import { Perfil } from './Perfil';

export class PerfilAvancado extends Perfil {
    habilitarPerfil(perfil: Perfil): void {
        if (perfil instanceof PerfilAvancado) {
            console.log('Perfis avançados não podem habilitar outros perfis.');
            return;
        }
        perfil.ativar();
    }

    desabilitarPerfil(perfil: Perfil): void {
        if (perfil instanceof PerfilAvancado) {
            console.log('Perfis avançados não podem desabilitar outros perfis.');
            return;
        }
        perfil.desativar();
    }
}
